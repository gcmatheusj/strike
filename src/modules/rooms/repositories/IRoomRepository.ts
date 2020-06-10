import Room from '../infra/typeorm/entities/Room';
import ICreateRoomDTO from '../dtos/ICreateRoomDTO';

export default interface IRoomRepository {
  create(data: ICreateRoomDTO): Promise<Room>;
}
