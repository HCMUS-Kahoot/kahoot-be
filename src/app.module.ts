import { MONGO_CONNECTION_STRING } from './constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { LoggerMiddleware } from './utils/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsModule } from './modules/groups/groups.module';
import { AuthModule } from './modules/authentication/authentication.module';
import { GroupMembersModule } from './modules/group-members/group-members.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: configuration,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(MONGO_CONNECTION_STRING),
      }),
    }),
    GroupsModule,
    AuthModule,
    GroupMembersModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
