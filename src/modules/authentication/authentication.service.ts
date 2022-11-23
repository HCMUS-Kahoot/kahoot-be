import { UsersService } from './users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import { accessTokenSignConfig, refreshTokenSignConfig } from './tokenConfig';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ){}
  async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.validateUserPassword(username, password)
  }
  async login(user: any)
  {
    const payload={name: user.lastname, sub: user.id}
    return {
      access_token: this.jwtService.sign(payload, accessTokenSignConfig),
      refresh_token: this.jwtService.sign(payload, refreshTokenSignConfig),
      userInfo: user
    }
  }
  async register(user: any): Promise<any>
  {
    const userFindByEmail=await this.usersService.getUserByEmail(user.email);
    if(userFindByEmail)
    {
      throw new BadRequestException('Email aldready exists');
    }
    const hash = await bcrypt.hash(user.password, 12);
    console.log(hash);
    const payload={name: user.lastname, sub: user.id}
    const newRefreshToken = this.jwtService.sign(payload, refreshTokenSignConfig);
    const createUser= await this.usersService.create({
      email: user.email,
      password: hash,
      refreshToken: newRefreshToken,
    })
    console.log(createUser);
    return {
      access_token: this.jwtService.sign(payload, accessTokenSignConfig),
      refresh_token: newRefreshToken,
      userInfo: createUser
    }
  }
}
