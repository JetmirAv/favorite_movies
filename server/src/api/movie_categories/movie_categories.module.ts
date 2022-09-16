import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCategoriesController } from './movie_categories.controller';
import { MovieCategories } from './movie_categories.entity';
import { MovieCategoriesService } from './movie_categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieCategories])],
  controllers: [MovieCategoriesController],
  providers: [MovieCategoriesService],
})
export class MovieCategoriesModule {}
