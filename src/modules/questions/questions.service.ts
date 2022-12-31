import { Injectable } from "@nestjs/common";
import { BaseService } from "../../base/base.service";
import { QuestionsRepository } from "./questions.repository";
import { QuestionsDocument } from "./schema/questions.schema";

@Injectable()
export class QuestionsService extends BaseService<QuestionsDocument> {
  constructor(private readonly questionsRepository: QuestionsRepository) {
    super(questionsRepository);
  }
}