import { injectable, inject } from 'tsyringe';

import Room from '../infra/typeorm/entities/Room';
import IRoomRepository from '../repositories/IRoomRepository';

interface IRequest {
  hostUser: string;
  name: string;
  capacityLimit?: number;
}

@injectable()
class CreateRoomsService {
  constructor(
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
  ) {}

  public async execute({
    hostUser,
    name,
    capacityLimit,
  }: IRequest): Promise<Room> {
    return this.roomRepository.create({ hostUser, name, capacityLimit });
  }
}

export default CreateRoomsService;
