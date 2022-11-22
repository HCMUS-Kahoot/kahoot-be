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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: "ThisSecretkey",
      signOptions:{expiresIn: '300s'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
