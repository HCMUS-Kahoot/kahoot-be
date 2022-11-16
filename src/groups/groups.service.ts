import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import { GroupDocument } from './schema/groups.schema';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService extends BaseService<GroupDocument> {
  constructor(private readonly groupsRepository: GroupsRepository) {
    super(groupsRepository);
  }
}
