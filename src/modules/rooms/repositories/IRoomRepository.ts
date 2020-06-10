import Room from '../infra/typeorm/entities/Room';
import ICreateRoomDTO from '../dtos/ICreateRoomDTO';

export default interface IRoomRepository {
  findById(id: string): Promise<Room | undefined>;
  create(data: ICreateRoomDTO): Promise<Room>;
}
