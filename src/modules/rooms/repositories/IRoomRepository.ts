import Room from '../infra/typeorm/entities/Room';
import ICreateRoomDTO from '../dtos/ICreateRoomDTO';
import IFindByIdAndHostUserDTO from '../dtos/IFindByIdAndHostUserDTO';

export default interface IRoomRepository {
  findById(id: string): Promise<Room | undefined>;
  findByIdAndHostUser(data: IFindByIdAndHostUserDTO): Promise<Room | undefined>;
  create(data: ICreateRoomDTO): Promise<Room>;
  save(room: Room): Promise<Room>;
}
