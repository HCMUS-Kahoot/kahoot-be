import { Controller } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { ChatsDocument } from "./schema/chats.schema";

@Controller('chats')
@ApiTags('chats')
export class ChatsController extends FactoryBaseController<
  ChatsDocument,
  CreateChatDto,
  UpdateChatDto
>(CreateChatDto, UpdateChatDto) {
  constructor(
    private readonly chatsService: ChatsService,
  ) {
    super(chatsService);
  }
}
