import IRoomParticipantsRepository from '@modules/rooms/repositories/IRoomParticipantsRepository';

import RoomParticipants from '@modules/rooms/infra/typeorm/entities/RoomParticipants';
import ICreateRoomParticipantDTO from '@modules/rooms/dtos/ICreateRoomParticipantDTO';

class FakeRoomParticipantsRepository implements IRoomParticipantsRepository {
  private roomParticipants: RoomParticipants[] = [];

  public async count(id: string): Promise<number> {
    const findRoom = this.roomParticipants.filter(room => room.roomId === id);

    return findRoom.length;
  }

  public async create(
    roomParticipantData: ICreateRoomParticipantDTO,
  ): Promise<RoomParticipants> {
    const roomParticipant = new RoomParticipants();

    Object.assign(roomParticipant, roomParticipantData);

    this.roomParticipants.push(roomParticipant);

    return roomParticipant;
  }
}

export default FakeRoomParticipantsRepository;
