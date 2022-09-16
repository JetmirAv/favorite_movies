import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './category.dto';
import { Category } from './category.entity';

import categories from './category.json';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly repository: Repository<Category>;

  public async getCategories(): Promise<{ data: Category[]; count: number }> {
    const result = await this.repository.findAndCount();

    return { data: result[0], count: result[1] };
  }

  public createCategory(body: CreateCategoryDto): Promise<Category> {
    const movie: Category = new Category();

    movie.name = body.name;

    return this.repository.save(movie);
  }

  //Initial movie create
  public async initCategories(): Promise<void> {
    const number = await this.repository.count();

    if (number === 0)
      categories.map((category) => {
        this.createCategory({
          name: category.name,
        });
      });
  }
}
