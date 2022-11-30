import { GroupMembersRepository } from './group-members.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { GroupMembersDocument } from './schema/group-members.schema';

@Injectable()
export class GroupMembersService extends BaseService<GroupMembersDocument> {
  constructor(private readonly groupMembersModel: GroupMembersRepository) {
    super(groupMembersModel);
  }
}
