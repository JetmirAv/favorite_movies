import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteMoviesService } from '../user_favorite_movies/user_favorite_movie.service';
import { UserFavoriteMovie } from '../user_favorite_movies/user_favorite_movie.entity';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, UserFavoriteMovie])],
  controllers: [MovieController],
  providers: [MovieService, UserFavoriteMoviesService],
})
export class MovieModule {}
