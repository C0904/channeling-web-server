import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('authentication')
export class Authentication {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'social_type' })
  socialType: number;

  @Column({ length: 64 })
  email: string;

  @Column({ name: 'identification_code' })
  identificationCode: string;

  @CreateDateColumn({
    name: 'created_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdTime: Date;

  @UpdateDateColumn({
    name: 'updated_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  lastLoginedTime: Date;

  @DeleteDateColumn({
    name: 'deleted_time',
    type: 'timestamp',
    nullable: true,
  })
  deletedTime: Date | null;

  @OneToOne(() => User, (user) => user.authId)
  user: User;
}
