import {
  GroupMembers,
  GroupMembersDocument,
} from './schema/group-members.schema';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GroupMembersRepository extends BaseRepository<GroupMembersDocument> {
  constructor(
    @InjectModel(GroupMembers.name)
    private readonly groupMembersModel: Model<GroupMembersDocument>,
  ) {
    super(groupMembersModel);
  }
}
