import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PresentationSessions, PresentationSessionsDocument } from './schema/presentationSessions.schema';

@Injectable()
export class PresentationSessionsRepository extends BaseRepository<PresentationSessionsDocument> {
  constructor(
    @InjectModel(PresentationSessions.name) private readonly presentationSessionModel: Model<PresentationSessionsDocument>,
  ) {
    super(presentationSessionModel);
  }
}
