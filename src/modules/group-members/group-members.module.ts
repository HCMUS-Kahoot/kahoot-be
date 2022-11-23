import { GroupMembersRepository } from './group-members.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMembersController } from './group-members.controller';
import { GroupMembersService } from './group-members.service';
import { GroupMembersSchema } from './schema/group-members.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GroupMembers', schema: GroupMembersSchema },
    ]),
  ],
  controllers: [GroupMembersController],
  providers: [GroupMembersService, GroupMembersRepository],
})
export class GroupMembersModule {}
