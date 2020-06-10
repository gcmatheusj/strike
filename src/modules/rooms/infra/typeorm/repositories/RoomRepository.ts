import { getRepository, Repository } from 'typeorm';

import IRoomRepository from '@modules/rooms/repositories/IRoomRepository';

import Room from '@modules/rooms/infra/typeorm/entities/Room';
import ICreateRoomDTO from '@modules/rooms/dtos/ICreateRoomDTO';
import IFindByIdAndHostUserDTO from '@modules/rooms/dtos/IFindByIdAndHostUserDTO';

class RoomRepository implements IRoomRepository {
  private ormRepository: Repository<Room>;

  constructor() {
    this.ormRepository = getRepository(Room);
  }

  public async findById(id: string): Promise<Room | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByIdAndHostUser({
    id,
    hostUser,
  }: IFindByIdAndHostUserDTO): Promise<Room | undefined> {
    return this.ormRepository.findOne({ where: { id, hostUser } });
  }

  public async create(roomData: ICreateRoomDTO): Promise<Room> {
    const room = this.ormRepository.create(roomData);

    await this.ormRepository.save(room);

    return room;
  }

  public async save(room: Room): Promise<Room> {
    return this.ormRepository.save(room);
  }
}

export default RoomRepository;
