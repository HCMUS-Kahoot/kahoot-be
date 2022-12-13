import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Slide, SlidesDocument } from './schema/slides.schema';
@Injectable()
export class SlidesRepository extends BaseRepository<SlidesDocument> {
  constructor(
    @InjectModel(Slide.name) private readonly slideModel: Model<SlidesDocument>,
  ) {
    super(slideModel);
  }
}
