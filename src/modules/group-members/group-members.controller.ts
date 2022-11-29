import {
  Body,
  Controller,
  NotFoundException,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { FactoryBaseController } from '../../base/factory-base.controller';
import { Override } from '../../common/decorators/override.decorator';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { GroupMembersService } from './group-members.service';
import { GroupMembersDocument } from './schema/group-members.schema';
import groupAbility from './group-authorization';
@Controller('group-members')
@ApiTags('group-members')
export class GroupMembersController extends FactoryBaseController<
  GroupMembersDocument,
  AddMemberDto,
  UpdateMemberDto
>(AddMemberDto, UpdateMemberDto) {
  constructor(
    private readonly groupMembersService: GroupMembersService,
    private readonly groupAbility: groupAbility,
  ) {
    super(groupMembersService);
  }

  @Override()
  async update(@GetCurrentUserId() id: string, @Body() body: UpdateMemberDto) {
    const userInGroup = await this.groupMembersService.getItemByQuery({
      memberId: id,
      groupId: body.groupId,
    });
    const targetUser = await this.groupMembersService.getItemByQuery({
      memberId: body.memberId,
      groupId: body.groupId,
    });

    if (userInGroup.length > 0 && targetUser.length > 0) {
      if (this.groupAbility.isAbilityInGroup(userInGroup, targetUser)) {
        return this.groupMembersService.updateOne(targetUser[0]._id, body);
      }
      throw new UnauthorizedException(
        'You are not authorized to update this user',
      );
    }
    throw new NotFoundException('User not found');
  }
}
