import { getRepository, Repository } from 'typeorm';

import IRoomParticipantsRepository from '@modules/rooms/repositories/IRoomParticipantsRepository';

import RoomParticipants from '@modules/rooms/infra/typeorm/entities/RoomParticipants';
import ICreateRoomParticipantDTO from '@modules/rooms/dtos/ICreateRoomParticipantDTO';
// import IFindByIdAndHostUserDTO from '@modules/rooms/dtos/IFindByIdAndHostUserDTO';

class RoomParticipantsRepository implements IRoomParticipantsRepository {
  private ormRepository: Repository<RoomParticipants>;

  constructor() {
    this.ormRepository = getRepository(RoomParticipants);
  }

  public async count(id: string): Promise<number> {
    return this.ormRepository.count({ where: { roomId: id } });
  }

  public async create(
    roomParticipantData: ICreateRoomParticipantDTO,
  ): Promise<RoomParticipants> {
    const roomParticipant = this.ormRepository.create(roomParticipantData);

    await this.ormRepository.save(roomParticipant);

    return roomParticipant;
  }
}

export default RoomParticipantsRepository;
