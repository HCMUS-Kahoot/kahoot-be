import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionsRepository } from './questions.repository';
import { QuestionsService } from './questions.service';
import { QuestionsSchema } from './schema/questions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Questions', schema: QuestionsSchema }]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsRepository],
})
export class QuestionsModule {}
