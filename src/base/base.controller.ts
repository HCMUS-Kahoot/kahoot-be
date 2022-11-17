import { BaseDocument } from './base.schema';
import {
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Controller,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { IBaseService } from './IBase.service';

@Controller()
export class BaseController<T extends BaseDocument> {
  constructor(private readonly iBaseService: IBaseService<T>) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll(): Promise<T[]> {
    return await this.iBaseService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Model retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Model does not exist' })
  async findById(@Param('id') id: string): Promise<T> {
    return await this.iBaseService.getItemById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() entity: T): Promise<T> {
    return await this.iBaseService.create(entity);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Model deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async delete(@Param('id') id: string) {
    return await this.iBaseService.delete(id);
  }

  @Put()
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 200, description: 'Model update successfully.' })
  async update(id: string, @Body() entity: T): Promise<T> {
    return await this.iBaseService.updateOne(id, entity);
  }
}
