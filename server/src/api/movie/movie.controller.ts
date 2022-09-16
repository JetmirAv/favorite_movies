import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.entity';

import { CreateMovieDto, GetAllMoviesQueryDTO } from './movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { UserFavoriteMoviesService } from '../user_favorite_movies/user_favorite_movie.service';
import { DataSource } from 'typeorm';
import { ListResponseDto } from 'src/common/dto/page.dto';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  @Inject(MovieService)
  private readonly service: MovieService;
  @Inject(UserFavoriteMoviesService)
  private readonly favoriteService: UserFavoriteMoviesService;
  @Inject(DataSource)
  private readonly dataSource: DataSource;

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public getMovies(
    @Query() query: GetAllMoviesQueryDTO,
  ): Promise<ListResponseDto<Movie>> {
    return this.service.getMovies(query);
  }

  @Post()
  public createMovie(@Body() body: CreateMovieDto): Promise<Movie> {
    return this.service.createMovie(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/favorite')
  public async getFavoriteMovies(
    @Query() query: GetAllMoviesQueryDTO,
    @Request() req,
  ) {
    return this.service.getFavoriteMovies(req.user.id, query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/favorite/:id/add')
  public async addFavoriteMovie(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    const movie = await this.service.getMovie(id, req.user.id);

    console.log({ fav: req.user.id });

    return this.favoriteService.createUserFavoriteMovie(req.user.id, movie.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/favorite/:id/remove')
  public async removeFavoriteMovie(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.favoriteService.removeUserFavoriteMovie(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public getMovie(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Movie> {
    return this.service.getMovie(id, req.user.id);
  }
}
