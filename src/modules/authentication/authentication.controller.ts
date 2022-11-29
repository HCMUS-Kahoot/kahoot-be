import { JwtRefreshAuthGuard } from '../../common/guards/jwt-refresh-auth.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './authentication.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): any {
    return 'jwt passed !';
  }

  @Post('local/signin')
  async login(@Body() userInfo, @Response() res): Promise<any> {
    const successLoginUser = await this.authservice.login(userInfo);
    if (successLoginUser) {
      res.set({
        'access-token': successLoginUser.access_token,
        'refresh-token': successLoginUser.refresh_token,
      });
      return res.status(200).send();
    }
    return res.status(500).send('Can not register new user');
  }

  @Post('local/signup')
  async signupLocal(@Body() userInfo: any, @Response() res: any): Promise<any> {
    const registedNewUser = await this.authservice.register(userInfo);
    if (registedNewUser) {
      res.set({
        'access-token': registedNewUser.access_token,
        'refresh-token': registedNewUser.refresh_token,
      });
      return res.status(200).send();
    }
    return res.status(500).send('Can not register new user');
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshAccessToken(
    @Response() res: any,
    @Request() req: any,
  ): Promise<any> {
    const refreshToken = this.authservice.getTokenFromRequestHeader(req);
    const payload = this.authservice.tokenToPayload(refreshToken);
    const refreshResult = await this.authservice.refreshAccessToken(
      refreshToken,
      payload.sub,
    );
    if (refreshResult) {
      res.set({
        'access-token': refreshResult.accessToken,
      });
      return res.status(200).send();
    }
    return res.status(500).send('Can not register new user');
  }
}
