import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieCategories } from './movie_categories.entity';

@Injectable()
export class MovieCategoriesService {
  @InjectRepository(MovieCategories)
  private readonly repository: Repository<MovieCategories>;

  public async createMovieCategories(
    category_id: number,
    movie_id: number,
  ): Promise<boolean> {
    const exists = await this.repository.findOne({
      where: { category_id, movie_id },
    });

    if (exists) return true;

    await this.repository.save({ category_id, movie_id });

    return true;
  }

  public async removeMovieCategories(
    category_id: number,
    movie_id: number,
  ): Promise<boolean> {
    await this.repository.delete({ category_id, movie_id });

    return true;
  }

  public async initMovieCategories(): Promise<void> {
    const number = await this.repository.count();

    if (number === 0) {
      const categoryCount = 8;
      const movieCount = 25;

      for (let i = 0; i < movieCount; i++) {
        const randNumStart = Math.floor(Math.random() * (7 - 1) + 1);
        const randNumStop = Math.floor(
          Math.random() * (8 - randNumStart) + randNumStart,
        );
        for (let j = randNumStart; j < randNumStop; j++) {
          this.createMovieCategories(j, i + 1);
        }
      }
    }
  }
}
