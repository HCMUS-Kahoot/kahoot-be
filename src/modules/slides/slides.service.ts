import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { MultipleChoiceService } from "../slide-content/multiple-choice/multiple-choice.service";
import { Slide, SlidesDocument } from './schema/slides.schema';
import { Model } from 'mongoose';
import { BaseService } from '../..//base/base.service';
import { SlidesRepository } from './slides.repository';

@Injectable()
export class SlidesServiceFactory{
  constructor(
    private readonly multipleChoiceService: MultipleChoiceService,
  ){}
  
  getService(type: string): any {
    switch(type){
      case 'MultipleChoice':
        return this.multipleChoiceService;
      default:
        return null;
    }
  }
}

@Injectable()
export class SlidesService extends BaseService<SlidesDocument> {
  constructor(
    @InjectModel(Slide.name)
    private readonly slideModel: Model<SlidesDocument>,
    private readonly slideServiceFactory: SlidesServiceFactory,
    private readonly slidesRepository: SlidesRepository
  ){
    super(slidesRepository)
  }
  async createOrUpdateASlide(slide, presentationId)
  {
    if(!slide._id)
    {
      return await this.createASlide(slide, presentationId)
    }
    else{
      return await this.updateOne(slide.id, slide)
    }
  }
  async createASlide(slide, presentationId)
  {
    
  }
}