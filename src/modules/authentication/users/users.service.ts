import { BaseService } from '../../../base/base.service';
import { UserDocument } from './schema/users.schema';
import { UsersRepository } from './users.repository';
import { Delete, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService extends BaseService<UserDocument> {
  constructor(private readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }
  async getUserByEmail(email: string): Promise<any>{
    if(!email)
    {
      throw Error("getUserByEmail FAILED: Can not read email value which is required field!");
    }
    try{
      return await this.usersRepository.findUserByEmail(email);
    }catch(error){
      throw Error("getUserByEmail FAILED: The userModel fail to find user with given email!");
    }
  }
  async validateUserPassword(email: string, password: string): Promise<any>{
    if(!email || !password)
    {
      throw Error("validateUserPassword FAILED: Can not read email or password value which is required field!");
    }
    try{
      const user = await this.usersRepository.validateUserByEmailAndPassword(email, password);
      if(user)
      {
        return user;
      }
      return null
    }catch(error){
      throw Error("validateUserPassword FAILED: The userModel fail to validate user with given email!");
    }
  }
}
