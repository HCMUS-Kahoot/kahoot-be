import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { LocalStrategy } from './strategies/local/local.strategy';
import { UserModule } from './users/users.module';
import { AuthService } from './authentication.service';
import { AuthController } from './authentication.controller';
import { AuthSchema } from './schema/authentication.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET_KEY } from '../../constant/index';
import { JwtRefreshStrategy } from './strategies/jwt/jwt-refresh.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    UserModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService]
})
export class AuthModule {}
