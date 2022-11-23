import { JwtAuthGuard } from './strategies/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { Controller, Post, UseGuards, Request, Response, Get, Body } from '@nestjs/common';
import { AuthService } from './authentication.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {
  }
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): any{
    return 'jwt passed !'
  }
  @UseGuards(LocalAuthGuard)
  @Post('local/signin')
  async login(@Request() req, @Response() res): Promise<any>{
    const successLoginUser = await this.authservice.login(req.user);
    if(successLoginUser)
    {
      res.set({
        'access-token': successLoginUser.access_token,
        'refresh-token': successLoginUser.refresh_token
      })
      return res.status(200).send(successLoginUser.userInfo);
    }
    return res.status(500).send("Can not register new user")
  }
  @Post('local/signup')
  async signupLocal(@Body() userInfo: any, @Response() res: any): Promise<any>{
    const registedNewUser= await this.authservice.register(userInfo);
    if(registedNewUser)
    {
      res.set({
        'access-token': registedNewUser.accessToken,
        'refresh-token' : registedNewUser.refreshToken,
      })
      return res.status(200).send(registedNewUser.userInfo);
    }
    return res.status(500).send("Can not register new user")
  }
}
