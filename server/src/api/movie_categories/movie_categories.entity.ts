import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';

import { Movie } from '../movie/movie.entity';
import { User } from '../user/user.entity';

@Entity()
export class MovieCategories {
  @PrimaryGeneratedColumn()
  public id!: number;

  @PrimaryColumn({ name: 'category_id' })
  category_id: number;

  @PrimaryColumn({ name: 'movie_id' })
  movie_id: number;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  /*
   * Associations
   */

  @ManyToOne(() => Category, (category) => category.movies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  categories: Category[];

  @ManyToOne(() => Movie, (movie) => movie.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'movie_id', referencedColumnName: 'id' }])
  movies: Movie[];
}
