import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./user.interface";
@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
