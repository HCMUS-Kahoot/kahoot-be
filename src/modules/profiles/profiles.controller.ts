import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';
import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ProfileDocument } from './schema/profiles.schema';
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from 'src/base/factory-base.controller';

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController extends FactoryBaseController<
  ProfileDocument,
  CreateProfileDto,
  UpdateProfileDto
>(CreateProfileDto, UpdateProfileDto) {
  constructor(private readonly profilesService: ProfilesService) {
    super(profilesService);
  }

  @Get('user/:id')
  async getProfileByUserId(@Param('id') id: string) {
    const res = await this.profilesService.getAll({ user: id });
    return res[0];
  }
  @Post('user/:id')
  async createOrUpdateProfileByUserId(@Param('id') id: string, @Body() body: CreateProfileDto) {
    const profiles = await this.profilesService.getAll({ user: id });
    const profile = profiles[0];
    if (profile) {
      return this.profilesService.updateOne(profile._id, {
        ...body,
        user: id,
      });
    }
    return this.profilesService.create({
      ...body,
      user: id,
    });
  }
}
