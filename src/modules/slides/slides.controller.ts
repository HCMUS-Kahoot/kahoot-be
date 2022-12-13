import { Controller, Post } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";
import { CreateSlidesDto } from "./dto/create-slide.dto";
import { UpdateSlidesDto } from "./dto/update-slide.dto";
import { SlidesDocument } from "./schema/slides.schema";
import { SlidesService } from "./slides.service";
import { Body, Get, Param } from '@nestjs/common/decorators';
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
    body.slideContent.forEach(slide => {
      this.slidesService.createOrUpdateASlide(slide,body.presentationId)
    });
  }
  @Get('getSlidesByPresentationId/:id')
  async getSlidesByPresentationIdWith(@Param('id') presentationId: String) {
    console.log("This is presentation param:  ", presentationId)
    return await this.slidesService.getSlidesByPresentationIdPopulateContent(presentationId)
  }
}
