import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PresentationSessionsController } from './presentationSessions.controller';
import { PresentationSessionsRepository } from './presentationSessions.repository';
import { PresentationSessionsService } from './presentationSessions.service';
import { PresentationSessionsSchema } from './schema/presentationSessions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PresentationSessions', schema: PresentationSessionsSchema }]),
  ],
  controllers: [PresentationSessionsController],
  providers: [PresentationSessionsService, PresentationSessionsRepository],
})
export class PresentationSessionsModule {}
