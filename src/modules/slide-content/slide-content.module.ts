import { Module } from "@nestjs/common";
import { MultipleChoiceModule } from "./multiple-choice/multiple-choice.module";
import { MultipleChoiceService } from "./multiple-choice/multiple-choice.service";

@Module({
  imports:[
    MultipleChoiceModule,
  ],
  providers:[
    MultipleChoiceService,
  ],
  exports:[
    MultipleChoiceService,
  ],
})
export class SlideContentsModule{}
