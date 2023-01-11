import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
import { BaseService } from '../../base/base.service';
import { User } from '../authentication/users/schema/users.schema';
import { UsersService } from '../authentication/users/users.service';
import { SlidesService } from '../slides/slides.service';
import { PresentationsRepository } from './presentations.repository';
import {
  Presentation,
  PresentationDocument,
} from './schema/presentations.schema';
@Injectable()
export class PresentationsService extends BaseService<PresentationDocument> {
  constructor(
    @InjectModel(Presentation.name)
    private readonly presentationModel: Model<PresentationDocument>,
    private readonly presentationsRepository: PresentationsRepository,
    private readonly slideService: SlidesService,
    private readonly usersService: UsersService,
  ) {
    super(presentationsRepository);
  }
  async deleteAPresentation(
    presentationId: string,
  ): Promise<PresentationDocument> {
    const presentation = await this.presentationModel.findById(presentationId);
    if (presentation) {
      await this.slideService.deleteSlidesByPresentationId(presentationId);
      return await this.presentationModel.findByIdAndDelete(presentationId);
    }
    throw NotFoundException;
  }
  async addNewCollaborator(
    ownerId: string,
    presentationId: string,
    newCollaborator: User,
  ): Promise<User[]> {
    let presentation = await this.presentationModel.findOne({
      _id: presentationId,
      owner: ownerId,
    });
    if (presentation && newCollaborator) {
      if (!presentation.collaborators) {
        presentation.collaborators = new Array<User>();
      }
      if (presentation.collaborators.includes(newCollaborator))
        return presentation.collaborators;
      await this.presentationModel.findByIdAndUpdate(presentationId, {
        collaborators: [...presentation.collaborators, newCollaborator],
      });
      return await (
        await this.presentationModel.findById(presentationId)
      ).collaborators;
    }
    throw NotFoundException;
  }
  async deleteCollaborator(
    ownerId: string,
    presentationId: string,
    deleteCollaborator: User,
  ): Promise<User[]> {
    let presentation = await this.presentationModel.findOne({
      _id: presentationId,
      owner: ownerId,
    });
    if (presentation && deleteCollaborator) {
      await this.presentationModel.findByIdAndUpdate(presentationId, {
        collaborators: presentation.collaborators.filter(
          (user) => user.email !== deleteCollaborator.email,
        ),
      });
      return await (
        await this.presentationModel.findById(presentationId)
      ).collaborators;
    }
    throw NotFoundException;
  }
}
