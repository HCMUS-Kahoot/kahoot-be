import { Logger, Injectable, BadGatewayException } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseDocument } from './base.schema';
@Injectable()
export class BaseRepository<T extends BaseDocument> {
  private logger = new Logger(this.constructor.name);

  constructor(private readonly container: Model<T>) {}

  async create(item): Promise<T> {
    try {
      const newItem = new this.container(item);
      await newItem.save();
      return newItem;
    } catch (error) {
      this.logger.error(error);
      throw new BadGatewayException(error.message);
    }
  }

  async updateOne(id: string, item): Promise<T | any> {
    try {
      await this.container.updateOne({ _id: id }, item).exec();
      return await this.container.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadGatewayException(error.message);
    }
  }

  async remove(id: string) {
    try {
      await this.container.findByIdAndDelete(id);
      return {
        message: 'Item with id: ' + id + ' deleted',
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadGatewayException(error.message);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.container.find();
    } catch (error) {
      this.logger.error(error);
      throw new BadGatewayException(error.message);
    }
  }

  async findById(id: string): Promise<T> {
    try {
      return await this.container.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadGatewayException(error.message);
    }
  }
}