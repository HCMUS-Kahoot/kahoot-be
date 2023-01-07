import { Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreatePresentationDto } from "./dto/create-presentation.dto";
import { UpdatePresentationDto } from "./dto/update-presentation.dto";
import { PresentationDocument } from "./schema/presentations.schema";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";
import { PresentationsService } from "./presentations.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { GetCurrentUserId } from "../../common/decorators/get-current-user-id.decorator";
import { Override } from "../../common/decorators/override.decorator";

@Controller('presentations')
@ApiTags('presentations')
export class PresentationsController extends FactoryBaseController<
  PresentationDocument,
  CreatePresentationDto,
  UpdatePresentationDto
>(CreatePresentationDto, UpdatePresentationDto) {
  constructor(
    private readonly presentationsService: PresentationsService,
  ) {
    super(presentationsService);
  }
  @Get('current-user-presentations')
  @UseGuards(JwtAuthGuard)
  async getCurrentUserPresentations(@GetCurrentUserId() id: string) {
    const presentations = await this.presentationsService.getAll({ owner: id });
    return Promise.all(presentations).then((result) => {
      return result;
    });
  }

  @Get('current-user-presentations-group/:groupId')
  @UseGuards(JwtAuthGuard)
  async getCurrentUserPresentationsGroup(@GetCurrentUserId() id: string, @Param('groupId') groupId: string)
  {
    const presentations = await this.presentationsService.getAll({ owner: id, groupId})
    return Promise.all(presentations).then((result) => {
      return result;
    });
  }

  @Post('/name/:id/:name')
  async updatePresentationName(@Param('id') id: string, @Param('name') name: string) {
    return this.presentationsService.updateOne(id, {
      name
    });
  }
  
  @Override()
  async delete(id: string, option?: any): Promise<Partial<PresentationDocument>> {
      return await this.presentationsService.deleteAPresentation(id);
  }
}
