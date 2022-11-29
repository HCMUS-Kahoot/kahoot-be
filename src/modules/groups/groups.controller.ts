import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { Controller, Get, Param } from '@nestjs/common';
import { GroupDocument } from './schema/groups.schema';
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from 'src/base/factory-base.controller';
import { GroupMembersService } from '../group-members/group-members.service';
import { GetCurrentUserId } from '../../common/decorators/get-current-user.decorator';

@Controller('groups')
@ApiTags('groups')
export class GroupsController extends FactoryBaseController<
  GroupDocument,
  CreateGroupDto,
  UpdateGroupDto
>(CreateGroupDto, UpdateGroupDto) {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly memberService: GroupMembersService,
  ) {
    super(groupsService);
  }

  @Get(':id/members')
  async getMembersByGroupId(@Param('id') id: string) {
    return this.memberService.getItemByQuery({
      groupId: id,
    });
  }
}
