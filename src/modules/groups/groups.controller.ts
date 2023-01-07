import { AuthService } from './../authentication/authentication.service';
import { Override } from './../../common/decorators/override.decorator';
import { JwtAuthGuard } from './../../common/guards/jwt-auth.guard';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { Body, Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { GroupDocument } from './schema/groups.schema';
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from 'src/base/factory-base.controller';
import { GroupMembersService } from '../group-members/group-members.service';
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator';

@Controller('groups')
@ApiTags('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController extends FactoryBaseController<
  GroupDocument,
  CreateGroupDto,
  UpdateGroupDto
>(CreateGroupDto, UpdateGroupDto) {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly memberService: GroupMembersService,
    private readonly userService: AuthService,
  ) {
    super(groupsService);
  }

  @Get(':id/members')
  async getMembersByGroupId(@Param('id') id: string) {
    const grInfor = await this.memberService.getAll({
      groupId: id,
    });
    const task = grInfor.map(async (group) => {
      const user = await this.userService.getCurrentUser(group.memberId);
      return { ...user, role: group.role };
    });

    const data = await Promise.all(task).then((result) => {
      return result;
    });
    return data;
  }

  @Override()
  async create(@Body() body: CreateGroupDto, @GetCurrentUserId() id: string) {
    const group = await this.groupsService.create({ ...body, adminId: id });
    await this.memberService.create({
      groupId: group._id,
      memberId: id,
      role: 'owner',
    });
    return group;
  }

  @Get('current-user-groups')
  @UseGuards(JwtAuthGuard)
  async getCurrentUserGroups(@GetCurrentUserId() id: string) {
    const groups = await this.memberService.getAll({ memberId: id });
    const task = groups.map(async (group) =>
      this.groupsService.getItemById(group.groupId),
    );
    return Promise.all(task).then((result) => {
      return result;
    });
  }
  @Get('group-that-im-admin')
  @UseGuards(JwtAuthGuard)
  async getGroupThatImAdmin(@GetCurrentUserId() id: string) {
    const groups = await this.memberService.getAll({ memberId: id });

    const task = groups.map(async (group) =>
      this.groupsService.getItemById(group.groupId),
    );
    return Promise.all(task).then((result) => {
      return result;
    });
  }
  @Get('group-that-im-co-owner')
  @UseGuards(JwtAuthGuard)
  async getGroupThatImCoOwner(@GetCurrentUserId() id: string) {
    const groups = await this.memberService.getAll({ memberId: id, role: 'cohost' });

    const task = groups.map(async (group) =>
      this.groupsService.getItemById(group.groupId),
    );
    return Promise.all(task).then((result) => {
      return result;
    });
  }

  @Get('group-that-im-member')
  @UseGuards(JwtAuthGuard)
  async getGroupThatImMember(@GetCurrentUserId() id: string) {
    const groups = await this.memberService.getAll({ memberId: id, role: 'member' });
    const task = groups.map(async (group) =>
      this.groupsService.getItemById(group.groupId),
    );
    return Promise.all(task).then((result) => {
      return result;
    });
  }


  @Get(':id/invitations')
  @UseGuards(JwtAuthGuard)
  async getInvitationsByGroupId(
    @Param('id') id: string,
    @GetCurrentUserId() userId: string,
  ) {
    const exist = await this.memberService.getItemByQuery({
      groupId: id,
      memberId: userId,
    });
    if (exist.length > 0) {
      return exist[0];
    }
    return await this.memberService.create({
      groupId: id,
      memberId: userId,
      role: 'member',
    })
  }
  @Override()
  async delete(@Param('id') id: string) {
    let list = await this.memberService.getItemByQuery({ groupId: id });
    list.forEach(async (item) => {
      await this.memberService.delete(item._id);
    });
    return super.delete(id);
  }
  @Get('edit/:groupId/:newName/:newDescription')
  async editGroupName(@Param('groupId') groupId: string, @Param('newName') newName: string, @Param('newDescription') newDescription: string) {
    return await this.groupsService.update(groupId, { name: newName , description: newDescription});
  }
}
