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
import { PresentationsModule } from './modules/presentations/presentations.module';
import { SlidesModule } from './modules/slides/slides.module';
import { SlideContentsModule } from './modules/slide-content/slide-content.module';
import { PresentationSessionsModule } from './modules/presentationSessions/presentationSessions.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ChatsModule } from './modules/chats/chats.module';
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
    PresentationsModule,
    PresentationSessionsModule,
    SlideContentsModule,
    SlidesModule,
    QuestionsModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
