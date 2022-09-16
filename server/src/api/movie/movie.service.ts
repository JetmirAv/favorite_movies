import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListResponseDto } from 'src/common/dto/page.dto';
import { DataSource, ILike, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateMovieDto, GetAllMoviesQueryDTO } from './movie.dto';
import { Movie } from './movie.entity';

import movies from './movies.json';

const orderOptions = {
  created_at: { field: 'movie.created_at', order: 'ASC' },
  '-created_at': { field: 'movie.created_at', order: 'DESC' },
  name: { field: 'movie.title', order: 'ASC' },
  '-name': { field: 'movie.title', order: 'DESC' },
};

@Injectable()
export class MovieService {
  @InjectRepository(Movie)
  private readonly repository: Repository<Movie>;

  @Inject(DataSource)
  private readonly dataSource: DataSource;

  public async getMovie(id: number, user_id: number): Promise<Movie> {
    const movie = await this.repository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.users', 'user', 'user.id = :user_id', {
        user_id,
      })
      .where(`movie.id = :id`, { id })
      .getOne();

    if (!movie) {
      throw new HttpException('movie_not_found', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  public async getMovies(
    query: GetAllMoviesQueryDTO,
  ): Promise<ListResponseDto<Movie>> {
    let sort;
    if (orderOptions[query.sort]) {
      sort = orderOptions[query.sort];
    } else {
      sort = orderOptions['created_at'];
    }

    const builder = this.repository
      .createQueryBuilder('movie')
      .orderBy(sort.field, sort.order);

    if (query.category) {
      builder.innerJoin(
        'movie.categories',
        'categories',
        'categories.id = :id',
        { id: query.category },
      );
    }

    if (query.title) {
      builder.where('movie.title ilike :title', { title: `%${query.title}%` });
    }

    const result = await builder
      .skip((query.page - 1) * 10)
      .take(10)
      .getManyAndCount();

    return new ListResponseDto(result[0], result[1], query.page, 10);
  }

  public createMovie(body: CreateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();

    movie.title = body.title;
    movie.year = body.year;
    movie.director = body.director;
    movie.summary = body.summary;
    movie.poster = body.poster;
    movie.imbd_rating = body.imbd_rating;
    movie.runtime = body.runtime;

    return this.repository.save(movie);
  }

  public saveMovie(movie: Movie): Promise<Movie> {
    return this.repository.save(movie);
  }

  public async getFavoriteMovies(
    user_id: number,
    query: GetAllMoviesQueryDTO,
  ): Promise<ListResponseDto<Movie>> {
    let sort;
    if (orderOptions[query.sort]) {
      sort = orderOptions[query.sort];
    } else {
      sort = orderOptions['created_at'];
    }

    const builder = this.repository
      .createQueryBuilder('movie')
      .innerJoin('movie.users', 'user', 'user.id = :user_id', {
        user_id,
      })
      .orderBy(sort.field, sort.order);

    if (query.title) {
      builder.where('movie.title ilike :title', { title: `%${query.title}%` });
    }

    if (query.category) {
      builder.innerJoin(
        'movie.categories',
        'categories',
        'categories.id = :id',
        { id: query.category },
      );
    }

    const result = await builder
      .skip((query.page - 1) * 10)
      .take(10)
      .getManyAndCount();

    return new ListResponseDto(result[0], result[1], query.page, 10);
  }

  //Initial movie create
  public async initMovies(): Promise<void> {
    const number = await this.repository.count();

    if (number === 0)
      movies.map((movie) => {
        this.createMovie({
          title: movie.title,
          director: movie.director,
          imbd_rating: +movie.imbd_rating || 0,
          poster: movie.poster,
          runtime: +movie.runtime || 0,
          summary: movie.summary,
          year: +movie.year || 2020,
        });
      });
  }
}
