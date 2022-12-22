import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Questions, QuestionsDocument } from './schema/questions.schema';

@Injectable()
export class QuestionsRepository extends BaseRepository<QuestionsDocument> {
  constructor(
    @InjectModel(Questions.name) private readonly questionnModel: Model<QuestionsDocument>,
  ) {
    super(questionnModel);
  }
}
