import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";
import { User } from "../../authentication/users/schema/users.schema";

export class UpdatePresentationDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Presentation owner', type: mongoose.Schema.Types.ObjectId })
  owner: User;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Presentation name', type: String })
  name: String;

  @IsString()
  @ApiProperty({ description: 'Presentation edit date', type: Date, default: Date.now() })
  lastEdit: Date;
}