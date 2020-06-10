import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import RoomParticipant from './RoomParticipants';

@Entity('rooms')
class Rooms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'host_user' })
  hostUser: string;

  @Column({ name: 'capacity_limit', default: 5 })
  capacityLimit: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.hostRooms, { primary: true })
  @JoinColumn({ name: 'host_user' })
  user: User;

  @OneToMany(() => RoomParticipant, roomParticipant => roomParticipant.room)
  participants: RoomParticipant[];
}

export default Rooms;
