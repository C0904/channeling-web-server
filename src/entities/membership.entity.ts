import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('membership')
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'expires_in' })
  expiresIn: string;

  @CreateDateColumn({ name: 'applied_at' })
  appliedAt: Date;
}
