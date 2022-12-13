import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMultipleChoiceDto } from "./dto/create-multiple-choice.dto";
import { MultipleChoice, MultipleChoiceDocument, } from "./schema/multiple-choice.schema";

@Injectable()
export class MultipleChoiceService {
  constructor(
    @InjectModel(MultipleChoice.name)
    private readonly slideModel: Model<MultipleChoiceDocument>)
  {}

  async createContent(exercise: CreateMultipleChoiceDto): Promise<MultipleChoiceDocument>{
    return await this.slideModel.create(exercise);
  }

  async updateContent(
    id: string,
    content: CreateMultipleChoiceDto,
  ): Promise<MultipleChoiceDocument>{
    return await this.slideModel.findByIdAndUpdate(id, content);
  }

  async deleteContent(id: string): Promise<void> {
    return await this.slideModel.findByIdAndDelete(id);
  }

  async getContent(id: string): Promise<MultipleChoiceDocument> {
    return await this.slideModel.findById(id).exec();
  }
  
}