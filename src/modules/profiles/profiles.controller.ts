import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';
import { Controller } from '@nestjs/common';
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
}
