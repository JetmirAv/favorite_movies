import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  toBoolean,
  toDate,
  toLowerCase,
  toNumber,
  trim,
} from 'src/common/helper/cast.helper';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsNumber()
  @Max(new Date().getFullYear())
  @Type(() => Number)
  public year: number;

  @IsString()
  @IsNotEmpty()
  public director: string;

  @IsString()
  @IsNotEmpty()
  public summary: string;

  @IsString()
  @IsNotEmpty()
  public poster: string;

  @IsNumber()
  @Max(10.0)
  @Type(() => Number)
  public imbd_rating: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public runtime: number;
}

export class GetAllMoviesQueryDTO {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  public page = 1;

  @Transform(({ value }) => toNumber(value, { default: 10, min: 10 }))
  @IsNumber()
  @IsOptional()
  public take = 10;

  @Transform(({ value }) => toLowerCase(trim(value)))
  @IsOptional()
  public title = '';

  @Transform(({ value }) => toLowerCase(trim(value)))
  @IsOptional()
  public sort = 'created_at';

  @Transform(({ value }) => toNumber(value, { min: 1 }))
  @IsNumber()
  @IsOptional()
  public category: number;
}
