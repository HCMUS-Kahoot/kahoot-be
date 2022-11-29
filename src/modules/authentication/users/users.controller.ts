import { Controller } from '@nestjs/common';
import { FactoryBaseController } from 'src/base/factory-base.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schema/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends FactoryBaseController<UserDocument, CreateUserDto, UpdateUserDto>(
  CreateUserDto, UpdateUserDto
) {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
