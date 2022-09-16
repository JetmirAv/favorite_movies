import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { Movie } from '../movie/movie.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name!: string;

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

  @ManyToMany(() => Movie, (movie) => movie.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  movies?: Movie[];
}
