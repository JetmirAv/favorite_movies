import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public title!: string;

  @Column({ type: 'int' })
  public year!: number;

  @Column({ type: 'varchar', length: 120 })
  public director!: string;

  @Column({ type: 'text' })
  public summary!: string;

  @Column({ type: 'varchar', length: 300 })
  public poster!: string;

  @Column({ type: 'float' })
  public imbd_rating!: number;

  @Column({ type: 'int' })
  public runtime!: number;
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

  @ManyToMany(() => User, (user) => user.favorite_movies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  users?: User[];

  @ManyToMany(
    () => Category,
    (category) => category.movies, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'movie_categories',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories?: Category[];
}
