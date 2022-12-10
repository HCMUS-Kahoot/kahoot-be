import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Presentation, PresentationDocument } from './schema/presentations.schema';

@Injectable()
export class PresentationsRepository extends BaseRepository<PresentationDocument> {
  constructor(
    @InjectModel(Presentation.name) private readonly presentationModel: Model<PresentationDocument>,
  ) {
    super(presentationModel);
  }
}
