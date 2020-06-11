import RoomParticipants from '../infra/typeorm/entities/RoomParticipants';
import ICreateRoomParticipantDTO from '../dtos/ICreateRoomParticipantDTO';

export default interface IRoomParticipantsRepository {
  // findById(id: string): Promise<RoomParticipants[] | undefined>;
  create(data: ICreateRoomParticipantDTO): Promise<RoomParticipants>;
  count(id: string): Promise<number>;
}
