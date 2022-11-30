import { BaseService } from '../../base/base.service';
import { Injectable } from '@nestjs/common';
import { ProfileDocument } from './schema/profiles.schema';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfilesService extends BaseService<ProfileDocument> {

  constructor(private readonly profilesRepository: ProfilesRepository) {
    super(profilesRepository);
  }
  // async getProfileByUserId(id: string) {
  //   return this.profilesRepository
  // }
}
