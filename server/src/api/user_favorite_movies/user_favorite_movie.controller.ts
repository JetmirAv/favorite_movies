import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserFavoriteMoviesService } from './user_favorite_movie.service';

@ApiTags('user_favorite_movie')
@Controller('favorite/movies')
export class UserFavoriteMoviesController {
  @Inject(UserFavoriteMoviesService)
  private readonly service: UserFavoriteMoviesService;
}
