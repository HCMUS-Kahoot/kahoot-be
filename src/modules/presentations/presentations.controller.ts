import { Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { PresentationDocument } from './schema/presentations.schema';
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from '../../base/factory-base.controller';
import { PresentationsService } from './presentations.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator';
import { Override } from '../../common/decorators/override.decorator';
import { Body, Delete } from '@nestjs/common/decorators';
import { UsersService } from '../authentication/users/users.service';
import { use } from 'passport';

@Controller('presentations')
@ApiTags('presentations')
export class PresentationsController extends FactoryBaseController<
  PresentationDocument,
  CreatePresentationDto,
  UpdatePresentationDto
>(CreatePresentationDto, UpdatePresentationDto) {
  constructor(
    private readonly presentationsService: PresentationsService,
    private readonly usersService: UsersService,
  ) {
    super(presentationsService);
  }
  @Get('current-user-presentations/:email')
  @UseGuards(JwtAuthGuard)
  async getCurrentUserPresentations(
    @GetCurrentUserId() id: string,
    @Param('email') email: string,
  ) {
    const presentations = await this.presentationsService.getAll({
      $or: [
        { owner: id },
        {
          'collaborators.email': email,
        },
      ],
    });
    return Promise.all(presentations).then((result) => result);
  }
  @Get('current-user-presentations-group/:groupId')
  @UseGuards(JwtAuthGuard)
  async getCurrentUserPresentationsGroup(
    @GetCurrentUserId() id: string,
    @Param('groupId') groupId: string,
  ) {
    const presentations = await this.presentationsService.getAll({
      owner: id,
      groupId,
    });
    return Promise.all(presentations).then((result) => {
      return result;
    });
  }

  @Post('/name/:id/:name')
  async updatePresentationName(
    @Param('id') id: string,
    @Param('name') name: string,
  ) {
    return this.presentationsService.updateOne(id, {
      name,
    });
  }
  @Post('addCollaborator')
  async addCollaborator(@Body() body: any) {
    const { ownerId, presentationId, collaboratorEmail } = body;
    const newCollaborator = await this.usersService.getUserByEmail(
      collaboratorEmail,
    );
    return await this.presentationsService.addNewCollaborator(
      ownerId,
      presentationId,
      newCollaborator,
    );
  }
  @Post('deleteCollaborator')
  async deleteCollaborator(@Body() body: any) {
    const { ownerId, presentationId, collaboratorEmail } = body;
    const deleteCollaborator = await this.usersService.getUserByEmail(
      collaboratorEmail,
    );
    return await this.presentationsService.deleteCollaborator(
      ownerId,
      presentationId,
      deleteCollaborator,
    );
  }

  @Override()
  async delete(
    id: string,
    option?: any,
  ): Promise<Partial<PresentationDocument>> {
    return await this.presentationsService.deleteAPresentation(id);
  }
}
