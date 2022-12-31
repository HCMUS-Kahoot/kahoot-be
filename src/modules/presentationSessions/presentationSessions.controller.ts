import { Controller } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";
import { CreatePresentationSessionDto } from "./dto/create-presentationSessions.dto";
import { UpdatePresentationSessionDto } from "./dto/update-presentationSessions.dto";
import { PresentationSessionsService } from "./presentationSessions.service";
import { PresentationSessionsDocument } from "./schema/presentationSessions.schema";

@Controller('presentationSessions')
@ApiTags('presentationSessions')
export class PresentationSessionsController extends FactoryBaseController<
  PresentationSessionsDocument,
  CreatePresentationSessionDto,
  UpdatePresentationSessionDto
>(CreatePresentationSessionDto, UpdatePresentationSessionDto) {
  constructor(
    private readonly presentationSessionsService: PresentationSessionsService,
  ) {
    super(presentationSessionsService);
  }
}
