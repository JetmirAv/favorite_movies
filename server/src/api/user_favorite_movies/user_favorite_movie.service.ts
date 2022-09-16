import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFavoriteMovie } from './user_favorite_movie.entity';

@Injectable()
export class UserFavoriteMoviesService {
  @InjectRepository(UserFavoriteMovie)
  private readonly repository: Repository<UserFavoriteMovie>;

  public async createUserFavoriteMovie(
    user_id: number,
    movie_id: number,
  ): Promise<boolean> {
    const exists = await this.repository.findOne({
      where: [{ user_id, movie_id }],
    });

    if (exists) return true;

    await this.repository.save({ user_id, movie_id });

    return true;
  }

  public async removeUserFavoriteMovie(
    user_id: number,
    movie_id: number,
  ): Promise<boolean> {
    await this.repository.delete({ user_id, movie_id });

    return true;
  }
}
