import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMultipleChoiceDto } from "./dto/create-multiple-choice.dto";
import { MultipleChoice, MultipleChoiceDocument, } from "./schema/multiple-choice.schema";
import { plainToClass } from 'class-transformer';

class MultipleChoiceDto{
  _id: string;
  detail: any;
  correctAnser: number;
}


@Injectable()
export class MultipleChoiceService {
  constructor(
    @InjectModel(MultipleChoice.name)
    private readonly slideModel: Model<MultipleChoiceDocument>)
  {}

  convertContent(exercise:any): Promise<any>{
    let dataItem=exercise.toObject();
    dataItem.choices=[];
    dataItem.data=[]
    dataItem.detail.forEach(choiceData => {
      dataItem.choices.push(choiceData.choiceContent)
      dataItem.data.push({name: choiceData.choiceContent, pv: 0})
    });
    console.log("This is data item before return: ", dataItem);
    return dataItem
  }

  async createContent(exercise: CreateMultipleChoiceDto): Promise<any>{
    const createdContent = await this.slideModel.create(exercise);
    return await this.convertContent(createdContent)
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
    const findData = await this.slideModel.findById(id).exec();
    return await this.convertContent(findData)
  }
  
}