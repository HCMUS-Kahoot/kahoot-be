import { Injectable } from "@nestjs/common";
import { BaseService } from "../../base/base.service";
import { PresentationSessionsRepository } from "./presentationSessions.repository";
import { PresentationSessionsDocument } from "./schema/presentationSessions.schema";

@Injectable()
export class PresentationSessionsService extends BaseService<PresentationSessionsDocument> {
  constructor(private readonly presentationSessionsRepository: PresentationSessionsRepository) {
    super(presentationSessionsRepository);
  }
}