import { Controller } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";
import { CreateSlidesDto } from "./dto/create-slide.dto";
import { UpdateSlidesDto } from "./dto/update-slide.dto";
import { SlidesDocument } from "./schema/slides.schema";

@Controller('slides')
@ApiTags('slides')
export class SlidesController extends FactoryBaseController<
  SlidesDocument,
  CreateSlidesDto,
  UpdateSlidesDto
>(CreateSlidesDto, UpdateSlidesDto) {

}