import { BaseCreateDto } from './dto/base-create.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseDocument } from './base.schema';
import { BaseRepository } from './base.repository';
import { IBaseService } from './IBase.service';

@Injectable()
export class BaseService<T extends BaseDocument> implements IBaseService<T> {
  constructor(private readonly genericRepository: BaseRepository<T>) {}

  async create(model: BaseCreateDto): Promise<T> {
    return this.genericRepository.create(model);
  }

  async updateOne(id: string, model: T): Promise<T> {
    return this.genericRepository.updateOne(id, model);
  }

  async delete(id: string) {
    const model = await this.genericRepository.findById(id);
    if (model) {
      return this.genericRepository.remove(id);
    }

    throw new NotFoundException('Item with id: ' + id + ' not found');
  }

  async getAll(): Promise<T[]> {
    return this.genericRepository.findAll();
  }

  async getItemById(id: string): Promise<T> {
    const model = await this.genericRepository.findById(id);
    if (model) {
      return model;
    }
    throw new NotFoundException('Item with id: ' + id + ' not found');
  }
}