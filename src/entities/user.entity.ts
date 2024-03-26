// user.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Authentication } from './authentication.entity';

@Entity('user')
export class User {
  @PrimaryColumn({ length: 12 })
  id: string;

  @Column({ length: 6 })
  nickname: string;

  @Column()
  role: number;

  @Column({ name: 'profile_url' })
  profileUrl: string;

  @DeleteDateColumn({
    name: 'deleted_time',
    type: 'timestamp',
    nullable: true,
  })
  deletedTime: Date | null;

  @OneToOne(() => Authentication, (auth) => auth.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'auth_id', referencedColumnName: 'id' })
  authId: string;
}
