import { Controller } from '@nestjs/common';
import { BaseController } from '../../../base/base.controller';
import { UserDocument } from './schema/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    // super(usersService);
  }
}
// export class UsersController extends BaseController<UserDocument> {
//   constructor(private readonly usersService: UsersService) {
//     super(usersService);
//   }
// }
