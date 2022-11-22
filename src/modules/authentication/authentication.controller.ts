import { JwtAuthGuard } from './strategies/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './authentication.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any{
    return this.authservice.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): any{
    return 'jwt passed !'
  }
}
