import { Heading, HeadingSchema } from './schema/heading.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeadingService } from './heading.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Heading.name, schema: HeadingSchema },]),
  ],
  providers: [HeadingService],
  exports: [
    MongooseModule.forFeature([
      {
        name: Heading.name,
        schema: HeadingSchema,
      },
    ]),
    HeadingService,
  ]
})
export class HeadingModule {}
