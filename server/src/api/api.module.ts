import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UserFavoriteMoviesModule } from './user_favorite_movies/user_favorite_movie.module';
import { MovieCategoriesModule } from './movie_categories/movie_categories.module';

@Module({
  imports: [
    UserModule,
    MovieModule,
    AuthModule,
    UserFavoriteMoviesModule,
    CategoryModule,
    MovieCategoriesModule,
  ],
})
export class ApiModule {}
