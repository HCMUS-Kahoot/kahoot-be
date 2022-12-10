import { Injectable } from "@nestjs/common";
import { BaseService } from "../../base/base.service";
import { PresentationsRepository } from "./presentations.repository";
import { PresentationDocument } from "./schema/presentations.schema";

@Injectable()
export class PresentationsService extends BaseService<PresentationDocument> {
  constructor(private readonly presentationsRepository: PresentationsRepository) {
    super(presentationsRepository);
  }
}