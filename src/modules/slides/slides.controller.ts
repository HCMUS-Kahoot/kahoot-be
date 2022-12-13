import { Controller, Post } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";
import { CreateSlidesDto } from "./dto/create-slide.dto";
import { UpdateSlidesDto } from "./dto/update-slide.dto";
import { SlidesDocument } from "./schema/slides.schema";
import { SlidesService } from "./slides.service";
import { Body } from '@nestjs/common/decorators';
@Controller('slides')
@ApiTags('slides')
export class SlidesController extends FactoryBaseController<
  SlidesDocument,
  CreateSlidesDto,
  UpdateSlidesDto
>(CreateSlidesDto, UpdateSlidesDto) {
  constructor(
    private readonly slidesService: SlidesService,
  ) {
    super(slidesService);
  }
  @Post('createOrUpdateListOfSlides')
  async createOrUpdateListOfSlides(@Body() body) {
    console.log("This is request body: ", body);
    body.slideContent.forEach(slide => {
      this.slidesService.createOrUpdateASlide(slide,body.presentationId)
    });
  }
}
