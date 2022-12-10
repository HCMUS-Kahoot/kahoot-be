import { Controller } from "@nestjs/common";
import { CreatePresentationDto } from "./dto/create-presentation.dto";
import { UpdatePresentationDto } from "./dto/update-presentation.dto";
import { PresentationDocument } from "./schema/presentations.schema";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";

@Controller('presentations')
@ApiTags('presentations')
export class PresentationsController extends FactoryBaseController<
  PresentationDocument,
  CreatePresentationDto,
  UpdatePresentationDto
>(CreatePresentationDto, UpdatePresentationDto) {

}