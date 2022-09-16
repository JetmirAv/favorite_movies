import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteMoviesController } from './user_favorite_movie.controller';
import { UserFavoriteMovie } from './user_favorite_movie.entity';
import { UserFavoriteMoviesService } from './user_favorite_movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavoriteMovie])],
  controllers: [UserFavoriteMoviesController],
  providers: [UserFavoriteMoviesService],
})
export class UserFavoriteMoviesModule {}
