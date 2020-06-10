import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Room from '../infra/typeorm/entities/Room';
import IRoomRepository from '../repositories/IRoomRepository';

interface IRequest {
  id: string;
  oldHostUser: string;
  hostUser: string;
}

@injectable()
class ChangeHostService {
  constructor(
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
  ) {}

  public async execute({
    id,
    oldHostUser,
    hostUser,
  }: IRequest): Promise<Room | undefined> {
    const room = await this.roomRepository.findByIdAndHostUser({
      id,
      hostUser: oldHostUser,
    });

    if (!room) {
      throw new AppError('Room not found', 404);
    }

    room.hostUser = hostUser;

    return this.roomRepository.save(room);
  }
}

export default ChangeHostService;
