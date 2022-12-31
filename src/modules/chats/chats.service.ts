import { Injectable } from "@nestjs/common";
import { BaseService } from "../../base/base.service";
import { ChatsRepository } from "./chats.repository";
import { ChatsDocument } from "./schema/chats.schema";

@Injectable()
export class ChatsService extends BaseService<ChatsDocument> {
  constructor(private readonly chatsRepository: ChatsRepository) {
    super(chatsRepository);
  }
}