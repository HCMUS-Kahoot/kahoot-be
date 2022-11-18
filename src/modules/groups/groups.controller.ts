import { GroupsService } from './groups.service';
import { Controller } from '@nestjs/common';
import { GroupDocument } from './schema/groups.schema';
import { BaseController } from '../../base/base.controller';

@Controller('groups')
export class GroupsController extends BaseController<GroupDocument> {
  constructor(private readonly groupsService: GroupsService) {
    super(groupsService);
  }
}
