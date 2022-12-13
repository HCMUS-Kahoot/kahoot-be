import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MultipleChoice, MultipleChoiceSchema } from './schema/multiple-choice.schema';
import { MultipleChoiceService } from './multiple-choice.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MultipleChoice.name, schema: MultipleChoiceSchema },]),
  ],
  providers: [MultipleChoiceService],
  exports: [
    MongooseModule.forFeature([
      {
        name: MultipleChoice.name,
        schema: MultipleChoiceSchema,
      },
    ]),
    MultipleChoiceService,
  ]
})
export class MultipleChoiceModule {}
