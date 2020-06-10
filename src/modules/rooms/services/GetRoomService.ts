import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Room from '../infra/typeorm/entities/Room';
import IRoomRepository from '../repositories/IRoomRepository';

interface IRequest {
  id: string;
}

@injectable()
class GetRoomService {
  constructor(
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Room | undefined> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new AppError('Room not found', 404);
    }

    return room;
  }
}

export default GetRoomService;
