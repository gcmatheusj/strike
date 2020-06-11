import IRoomParticipantsRepository from '@modules/rooms/repositories/IRoomParticipantsRepository';

import RoomParticipants from '@modules/rooms/infra/typeorm/entities/RoomParticipants';
import ICreateRoomParticipantDTO from '@modules/rooms/dtos/ICreateRoomParticipantDTO';
import ILeaveRoomParticipantDTO from '@modules/rooms/dtos/ILeaveRoomParticipantDTO';

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

  public async delete({
    userId,
    roomId,
  }: ILeaveRoomParticipantDTO): Promise<void> {
    const leaveParticipant = this.roomParticipants.filter(
      participant =>
        participant.userId !== userId && participant.roomId === roomId,
    );

    this.roomParticipants = leaveParticipant;
  }
}

export default FakeRoomParticipantsRepository;
