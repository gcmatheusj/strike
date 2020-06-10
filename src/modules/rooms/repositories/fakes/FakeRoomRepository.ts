import { uuid } from 'uuidv4';

import IRoomRepository from '@modules/rooms/repositories/IRoomRepository';

import Room from '@modules/rooms/infra/typeorm/entities/Room';
import ICreateRoomDTO from '@modules/rooms/dtos/ICreateRoomDTO';
import IFindByIdAndHostUserDTO from '@modules/rooms/dtos/IFindByIdAndHostUserDTO';

class FakeRoomRepository implements IRoomRepository {
  private rooms: Room[] = [];

  public async findById(id: string): Promise<Room | undefined> {
    const findRoom = this.rooms.find(room => room.id === id);

    return findRoom;
  }

  public async findByIdAndHostUser({
    id,
    hostUser,
  }: IFindByIdAndHostUserDTO): Promise<Room | undefined> {
    const findRoom = this.rooms.find(
      room => room.id === id && room.hostUser === hostUser,
    );

    return findRoom;
  }

  public async create(roomData: ICreateRoomDTO): Promise<Room> {
    const room = new Room();

    Object.assign(room, { id: uuid() }, roomData);

    this.rooms.push(room);

    return room;
  }

  public async save(room: Room): Promise<Room> {
    const findIndex = this.rooms.findIndex(findRoom => findRoom.id === room.id);

    this.rooms[findIndex] = room;

    return room;
  }
}

export default FakeRoomRepository;
