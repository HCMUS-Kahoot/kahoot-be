import { Controller, Get, UseGuards } from "@nestjs/common";
import { CreatePresentationDto } from "./dto/create-presentation.dto";
import { UpdatePresentationDto } from "./dto/update-presentation.dto";
import { PresentationDocument } from "./schema/presentations.schema";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";
import { PresentationsService } from "./presentations.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { GetCurrentUserId } from "../../common/decorators/get-current-user-id.decorator";

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
  async getCurrentUserGroups(@GetCurrentUserId() id: string) {
    const presentations = await this.presentationsService.getAll({ owner: id });
    return Promise.all(presentations).then((result) => {
      return result;
    });
  }
}