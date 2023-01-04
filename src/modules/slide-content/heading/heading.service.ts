import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateHeadingDto } from "./dto/create-heading.dto";
import { Heading, HeadingDocument } from "./schema/heading.schema";


@Injectable()
export class HeadingService {
  constructor(
    @InjectModel(Heading.name)
    private readonly slideModel: Model<HeadingDocument>)
  {}

  convertContent(exercise:any): Promise<any>{
    let dataItem=exercise.toObject();
    dataItem.heading = dataItem.detail[0];
    return dataItem
  }

  async createContent(exercise: CreateHeadingDto): Promise<any>{
    const createdContent = await this.slideModel.create(exercise);
    return await this.convertContent(createdContent)
  }

  async updateContent(
    id: string,
    content: CreateHeadingDto,
  ): Promise<HeadingDocument>{
    return await this.slideModel.findByIdAndUpdate(id, content);
  }

  async deleteContent(id: string): Promise<void> {
    return await this.slideModel.findByIdAndDelete(id);
  }

  async getContent(id: string): Promise<HeadingDocument> {
    const findData = await this.slideModel.findById(id).exec();
    return await this.convertContent(findData)
  }
  
}
