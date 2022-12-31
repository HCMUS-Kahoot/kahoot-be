import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chats, ChatsDocument } from './schema/chats.schema';

@Injectable()
export class ChatsRepository extends BaseRepository<ChatsDocument> {
  constructor(
    @InjectModel(Chats.name) private readonly chatModel: Model<ChatsDocument>,
  ) {
    super(chatModel);
  }
}
