import { UsersService } from './users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { accessTokenSignConfig, refreshTokenSignConfig } from './tokenConfig';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
        accessToken: newAccessToken,
      };
    }
    return null;
  }
  getTokenFromRequestHeader(request: any): string {
    const requestAuthorization = request.headers.authorization;
    const beforeExtractToken = requestAuthorization.split(' ');
    const token = beforeExtractToken[1];
    return token;
  }
  tokenToPayload(token: string): any {
    return this.jwtService.decode(token);
  }
}
