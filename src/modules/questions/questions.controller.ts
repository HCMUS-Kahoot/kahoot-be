import { Controller, Post } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { FactoryBaseController } from "../../base/factory-base.controller";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { QuestionsService } from "./questions.service";
import { QuestionsDocument } from "./schema/questions.schema";

@Controller('questions')
@ApiTags('questions')
export class QuestionsController extends FactoryBaseController<
  QuestionsDocument,
  CreateQuestionDto,
  UpdateQuestionDto
>(CreateQuestionDto, UpdateQuestionDto) {
  constructor(
    private readonly questionsService: QuestionsService,
  ) {
    super(questionsService);
  }
}
