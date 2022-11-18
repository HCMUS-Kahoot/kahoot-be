import { Group, GroupDocument } from './schema/groups.schema';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GroupsRepository extends BaseRepository<GroupDocument> {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
  ) {
    super(groupModel);
  }
}
