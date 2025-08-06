import { Injectable } from '@nestjs/common';
import {
  Repository,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  DeepPartial,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number | string): Promise<T | null> {
    return this.repository.findOne({ id } as any);
  }

  async getFirstOrDefault(
    filter?: FindOptionsWhere<T>,
    orderBy?: { [P in keyof T]?: 'ASC' | 'DESC' | undefined },
    relations: string[] = [],
  ): Promise<T | null> {
    const options: FindOneOptions<T> = {
      where: filter,
      //order: orderBy,
      relations,
    };
    return this.repository.findOne(options);
  }
}
