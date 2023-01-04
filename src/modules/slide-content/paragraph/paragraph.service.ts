import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateParagraphDto } from "./dto/create-paragraph.dto";
import { Paragraph, ParagraphDocument } from "./schema/paragraph.schema";


@Injectable()
export class ParagraphService {
  constructor(
    @InjectModel(Paragraph.name)
    private readonly slideModel: Model<ParagraphDocument>)
  {}

  convertContent(exercise:any): Promise<any>{
    let dataItem=exercise.toObject();
    dataItem.paragraph = dataItem.detail[0];
    return dataItem
  }

  async createContent(exercise: CreateParagraphDto): Promise<any>{
    const createdContent = await this.slideModel.create(exercise);
    return await this.convertContent(createdContent)
  }

  async updateContent(
    id: string,
    content: CreateParagraphDto,
  ): Promise<ParagraphDocument>{
    return await this.slideModel.findByIdAndUpdate(id, content);
  }

  async deleteContent(id: string): Promise<void> {
    return await this.slideModel.findByIdAndDelete(id);
  }

  async getContent(id: string): Promise<ParagraphDocument> {
    const findData = await this.slideModel.findById(id).exec();
    return await this.convertContent(findData)
  }
  
}
