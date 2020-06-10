import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import RoomParticipant from '@modules/rooms/infra/typeorm/entities/RoomParticipants';
import Room from '@modules/rooms/infra/typeorm/entities/Room';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: 'mobile_token', nullable: true })
  mobileToken: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Room, room => room.user)
  hostRooms: Room[];

  @OneToMany(() => RoomParticipant, roomParticipant => roomParticipant.user)
  rooms: RoomParticipant[];
}

export default User;
