import { UsersService } from './users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { API_SEND_MAIL_KEY } from '../../constant';
import { ConfigService } from "@nestjs/config";
import { accessTokenSignConfig, refreshTokenSignConfig } from './tokenConfig';
import * as bcrypt from 'bcrypt';
import sendGrid = require('@sendgrid/mail');
import randomstringGenerator = require('randomstring');
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.validateUserPassword(email, password);
  }
  async login(user: any) {
    const result = await this.usersService.validateUserPassword(
      user.email,
      user.password,
    );
    if (result) {
      const userId = await this.usersService.getUserIdByEmail(user.email);
      const payload = { email: user.email, sub: userId };
      const refreshToken = (await this.usersService.getItemById(userId))
        .refreshToken;
      const expired = this.tokenToPayload(refreshToken).exp;
      if (Date.now() >= parseInt(expired) * 1000) {
        const newRefreshToken = this.jwtService.sign(
          payload,
          refreshTokenSignConfig,
        );
        await this.usersService.updateUserRefreshToken(userId, newRefreshToken);
      }
      return {
        access_token: this.jwtService.sign(payload, accessTokenSignConfig),
        refresh_token: (await this.usersService.getUserByEmail(user.email))
          .refreshToken,
      };
    }
  }
  async register(user: any): Promise<any> {
    const userFindByEmail = await this.usersService.getUserByEmail(user.email);
    if (userFindByEmail) {
      throw new BadRequestException('Email aldready exists');
    }
    if (user.confirmPassword && user.confirmPassword !== user.password) {
      throw new BadRequestException(
        'The password and confirm password is not the same',
      );
    }
    const hash = await bcrypt.hash(user.password, 12);
    const createUser = await this.usersService.create({
      email: user.email,
      password: hash,
      refreshToken: '',
    });
    const userId = await this.usersService.getUserIdByEmail(user.email);
    const payload = { email: user.email, sub: userId };
    const newRefreshToken = this.jwtService.sign(
      payload,
      refreshTokenSignConfig,
    );
    await this.usersService.updateUserRefreshToken(userId, newRefreshToken);
    if (createUser) {
      return {
        access_token: this.jwtService.sign(payload, accessTokenSignConfig),
        refresh_token: newRefreshToken,
      };
    }
    return null;
  }
  async refreshAccessToken(refreshToken: string, userId: string): Promise<any> {
    const user = await this.usersService.getItemById(userId);
    if (!user) {
      throw new BadRequestException('Can not get user with given userId');
    }
    if (refreshToken === user.refreshToken) {
      const payload = { email: user.email, sub: userId };
      const newAccessToken = this.jwtService.sign(
        payload,
        accessTokenSignConfig,
      );
      return {
        access_token: newAccessToken
      }
    }
    return null;
  }
  async loginWithThirdService(req): Promise<any>{
    if(!req.user)
    {
      throw new BadRequestException("Can not read user from request which is required field");
    }
    const existedUser=await this.usersService.getUserByEmail(req.user.email);
    if(!existedUser)
    {
      const hash = await bcrypt.hash('123456', 12);
      const createUser= await this.usersService.create({
        email: req.user.email,
        password: hash,
        refreshToken: "",
      })
      const userId = await this.usersService.getUserIdByEmail(req.user.email);
      const payload={email: req.user.email, sub: userId}
      const newRefreshToken = this.jwtService.sign(payload, refreshTokenSignConfig);
      await this.usersService.updateUserRefreshToken(userId,newRefreshToken)
      if(createUser)
      {
        return {
          access_token: this.jwtService.sign(payload, accessTokenSignConfig),
          refresh_token: newRefreshToken,
        }
      }
      return null
    }
    const currentRefreshToken = existedUser.refreshToken;
    const expired=this.tokenToPayload(currentRefreshToken).exp
    const userId = await this.usersService.getUserIdByEmail(req.user.email);
    const payload ={sub: userId, email: req.user.email}
    if (Date.now() >= parseInt(expired) * 1000) {
      const newRefreshToken=this.jwtService.sign(payload, refreshTokenSignConfig);
      await this.usersService.updateUserRefreshToken(userId,newRefreshToken);
    }
    return {
      access_token: this.jwtService.sign(payload, accessTokenSignConfig),
      refresh_token: (await this.usersService.getUserByEmail(req.user.email)).refreshToken,
    }
  }
  async sentActivateAccountEmail(userInfo): Promise<any>{
    const email=userInfo.email;
    const activateCode = randomstringGenerator.generate();
    const setResult = await this.usersService.setActivatedCode(userInfo.sub,activateCode);
    if(setResult)
    {
      const senderApiKey=this.config.get<string>(API_SEND_MAIL_KEY)
      sendGrid.setApiKey(senderApiKey)
      const message = {
        to: email,
        from: 'darkflamekhtn@gmail.com',
        subject: 'Activate your account now!',
        html:`http://localhost:5000/api/auth/activateAccount?userId=${userInfo.sub}&activateCode=${activateCode}`
      }
      sendGrid.send(message)
    }
    else{
      throw new Error("Fail to set activate code to user");
    }    
  }

  async activateUser(query: any): Promise<any> {
    if(!query.userId||!query.activateCode)
    {
      throw new BadRequestException("Can not read userId or activateCode from query params which is required field");
    }
    const userFindById= await this.usersService.getItemById(query.userId);
    if(!userFindById)
    {
      throw new BadRequestException("Can not find user with given userId taken from query params")
    }
    if(userFindById.activateCode!==query.activateCode)
    {
      return false;
    }
    const activateResult= await this.usersService.updateActivateStatus(query.userId, true);
    if(activateResult)
    {
      return true;
    }
    return false;
  }

  getTokenFromRequestHeader(request: any): string{
    const requestAuthorization=request.headers.authorization;
    const beforeExtractToken=requestAuthorization.split(" ");
    const token=beforeExtractToken[1]
    return token
  }
  tokenToPayload(token: string): any {
    return this.jwtService.decode(token);
  }
}
