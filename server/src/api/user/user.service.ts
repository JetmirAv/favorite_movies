import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './user.dto';
import { User } from './user.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  //use by user module to change user password
  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await compare(payload.old_password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.repository
      .update(
        {
          id,
        },
        { password: await hash(payload.new_password, 10) },
      )
      .then((resp) => resp.raw[0]);
  }

  public getUser(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;
    user.password = await hash(body.password, 10);

    return this.repository.save(user);
  }

  //use by auth module to register user in database
  public async create(userDto: CreateUserDto): Promise<any> {
    // // check if the user exists in the db
    const userInDb = await this.repository.findOne({
      where: { email: userDto.email },
    });
    if (userInDb) {
      throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
    }

    return this.createUser({ ...userDto });
  }

  //use by auth module to login user
  public async findByLogin(data: LoginUserDto): Promise<User> {
    const user = await this.repository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(data.password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    user.password = null;

    return user;
  }

  async findByPayload({ email }: any): Promise<any> {
    return await this.repository.findOne({
      where: { email },
    });
  }
}
