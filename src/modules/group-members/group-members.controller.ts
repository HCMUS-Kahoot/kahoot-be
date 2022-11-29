import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from 'src/base/factory-base.controller';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { GroupMembersService } from './group-members.service';
import { GroupMembersDocument } from './schema/group-members.schema';

@Controller('group-members')
@ApiTags('group-members')
export class GroupMembersController extends FactoryBaseController<
  GroupMembersDocument,
  AddMemberDto,
  UpdateMemberDto
>(AddMemberDto, UpdateMemberDto) {
  constructor(private readonly groupMembersService: GroupMembersService) {
    super(groupMembersService);
  }
}
