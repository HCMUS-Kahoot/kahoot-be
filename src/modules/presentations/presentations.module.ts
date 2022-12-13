import { PresentationsRepository } from './presentations.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PresentationsController } from './presentations.controller';
import { PresentationsService } from './presentations.service';
import { PresentationSchema } from './schema/presentations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Presentation', schema: PresentationSchema }]),
  ],
  controllers: [PresentationsController],
  providers: [PresentationsService, PresentationsRepository],
})
export class PresentationsModule {}