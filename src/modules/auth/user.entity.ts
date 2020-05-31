import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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
