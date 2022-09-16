import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCategoriesService } from '../movie_categories/movie_categories.service';
import { MovieCategories } from '../movie_categories/movie_categories.entity';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, MovieCategories])],
  controllers: [CategoryController],
  providers: [CategoryService, MovieCategoriesService],
})
export class CategoryModule {}
