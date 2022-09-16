import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MovieCategoriesService } from './movie_categories.service';

@ApiTags('movie_categories')
@Controller('category-movies')
export class MovieCategoriesController {
  @Inject(MovieCategoriesService)
  private readonly service: MovieCategoriesService;
}
