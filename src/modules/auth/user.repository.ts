import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user-dto";
import * as bcrypt from "bcrypt";
import { ConflictException } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(createUserDto: CreateUserDto): Promise<string> {
    const { username, password } = createUserDto;
    const found = await this.findOne({ where: { username } });

    if (found) {
      throw new ConflictException("User with this username already exists");
    }

    const user = new UserEntity();
    user.username = username;

    user.salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, user.salt);

    await this.save(user);

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
