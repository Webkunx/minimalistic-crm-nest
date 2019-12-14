import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user-dto';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(createUserDto: CreateUserDto): Promise<string> {
    const { username, password } = createUserDto;
    const found = await this.findOne({ where: { username } });

    if (found) {
      throw new ConflictException('User with this username already exists');
    }

    const user = new User();
    user.username = username;

    user.salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, user.salt);

    user.save();

    return user.username;
  }

  async validateUserPassword(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const user = await this.findOne({ where: { username } });

    if (user && (await user.validatePassword(password))) {
      return username;
    }
    return null;
  }
}
