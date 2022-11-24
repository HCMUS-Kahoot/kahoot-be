import { Profile, ProfileDocument } from './schema/profiles.schema';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfilesRepository extends BaseRepository<ProfileDocument> {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
  ) {
    super(profileModel);
  }
}
