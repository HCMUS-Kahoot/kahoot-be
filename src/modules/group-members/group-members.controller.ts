import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { FactoryBaseController } from '../../base/factory-base.controller';
import { Override } from '../../common/decorators/override.decorator';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { GroupMembersService } from './group-members.service';
import { GroupMembersDocument } from './schema/group-members.schema';
import groupAbility from './group-authorization';
import { AuthService } from '../authentication/authentication.service';
import { UsersService } from '../authentication/users/users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
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
    private readonly userService: UsersService,
  ) {
    super(groupMembersService);
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  async update(@GetCurrentUserId() id: string, @Body() body: UpdateMemberDto) {
    const userInGroup = await this.groupMembersService.getItemByQuery({
      memberId: id,
      groupId: body.groupId,
    });
    const member = await this.userService.getUserByEmail(body.memberEmail);

    const targetUser = await this.groupMembersService.getItemByQuery({
      memberId: member._id,
      groupId: body.groupId,
    });

    if (userInGroup.length > 0 && targetUser.length > 0) {
      if (this.groupAbility.isAbilityInGroup(userInGroup[0], targetUser[0])) {
        return await this.groupMembersService.updateOne(
          targetUser[0]._id,
          {
            role: body.role,
            groupId: body.groupId,
            memberId: targetUser[0].memberId,
          }
        );
      }
      throw new UnauthorizedException(
        'You are not authorized to update this user',
      );
    }
    throw new NotFoundException('User not found');
  }
}
