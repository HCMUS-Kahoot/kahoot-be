import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "../../base/base.service";
import { SlidesService } from "../slides/slides.service";
import { PresentationsRepository } from "./presentations.repository";
import { Presentation, PresentationDocument } from "./schema/presentations.schema";

@Injectable()
export class PresentationsService extends BaseService<PresentationDocument> {
  constructor(
    @InjectModel(Presentation.name)
    private readonly presentationModel: Model<PresentationDocument>,
    private readonly presentationsRepository: PresentationsRepository,
    private readonly slideService: SlidesService,
    ) {
    super(presentationsRepository);
  }
  async deleteAPresentation(presentationId: any): Promise<PresentationDocument>
  {
    const presentation = await this.presentationModel.findById(presentationId);
    if(presentation)
    {
      await this.slideService.deleteSlidesByPresentationId(presentationId)
      return await  this.presentationModel.findByIdAndDelete(presentationId);
    }
    throw NotFoundException;
  }  
}