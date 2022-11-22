import { User, UserDocument } from './schema/users.schema';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../base/base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
  async findUserByEmail(email: String): Promise<any>{
    try {
      return await this.userModel.findOne({email: email});
    } catch (error) {
      throw new Error(error)
    }
  }
  async validateUserByEmailAndPassword(email:String, password: String): Promise<any>{
    try {
      return await this.userModel.findOne({email: email, password: password},{ email: 0, password: 0 });
    } catch (error) {
      throw new Error(error)
    }
  }
}
