import { Controller, Post } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";
import { CreateSlidesDto } from "./dto/create-slide.dto";
import { UpdateSlidesDto } from "./dto/update-slide.dto";
import { SlidesDocument } from "./schema/slides.schema";
import { SlidesService } from "./slides.service";
import { Body, Get, Param } from '@nestjs/common/decorators';
import { Override } from "../../common/decorators/override.decorator";
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
    var itemList = [];
    for(const slide of body.slideContent)
    {
      const item =  await this.slidesService.createOrUpdateASlide(slide,body.presentationId);
      itemList.push(item);
    }
    return itemList;
  }
  @Get('getSlidesByPresentationId/:id')
  async getSlidesByPresentationIdWith(@Param('id') presentationId: String) {
    let slides= await this.slidesService.getSlidesByPresentationIdPopulateContent(presentationId)
    return slides.sort((a, b) => Number(a.slideIndex) - Number(b.slideIndex))
  }

  @Override()
  async delete(id: string, option?: any): Promise<Partial<SlidesDocument>> {
      return await this.slidesService.deleteASlide(id);
  }
}
