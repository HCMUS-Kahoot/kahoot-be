import { UsersService } from './users/users.service';
import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
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
      access_token: this.jwtService.sign(payload)
    }
  }
}
