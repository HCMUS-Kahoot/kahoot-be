import { Module } from "@nestjs/common";
import { HeadingModule } from "./heading/heading.module";
import { HeadingService } from "./heading/heading.service";
import { MultipleChoiceModule } from "./multiple-choice/multiple-choice.module";
import { MultipleChoiceService } from "./multiple-choice/multiple-choice.service";
import { ParagraphModule } from "./paragraph/paragraph.module";
import { ParagraphService } from "./paragraph/paragraph.service";

@Module({
  imports:[
    MultipleChoiceModule,
    HeadingModule,
    ParagraphModule,
  ],
  providers:[
    MultipleChoiceService,
    HeadingService,
    ParagraphService,
  ],
  exports:[
    MultipleChoiceService,
    HeadingService,
    ParagraphService,
  ],
})
export class SlideContentsModule{}
