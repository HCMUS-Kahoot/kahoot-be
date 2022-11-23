import { GroupMembersRepository } from './group-members.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base/base.service';
import {
  GroupMembers,
  GroupMembersDocument,
} from './schema/group-members.schema';

@Injectable()
export class GroupMembersService extends BaseService<GroupMembersDocument> {
  constructor(
    @InjectModel(GroupMembers.name)
    private readonly groupMembersModel: GroupMembersRepository,
  ) {
    super(groupMembersModel);
  }
}
