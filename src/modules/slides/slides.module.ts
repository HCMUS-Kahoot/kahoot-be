import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Slide, SlidesSchema } from './schema/slides.schema';
import { SlideContentsModule } from '../slide-content/slide-content.module';
import { SlidesController } from './slides.controller';
import { SlidesService, SlidesServiceFactory } from './slides.service';
import { SlidesRepository } from './slides.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Slide.name,
        schema: SlidesSchema,
      },
    ]),
    SlideContentsModule,
  ],
  providers: [SlidesService, SlidesServiceFactory, SlidesRepository],
  controllers: [SlidesController],
  exports: [SlidesService],
})
export class SlidesModule {}
