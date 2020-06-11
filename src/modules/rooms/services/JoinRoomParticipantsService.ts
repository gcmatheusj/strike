import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import RoomParticipant from '../infra/typeorm/entities/RoomParticipants';
import IRoomParticipantsRepository from '../repositories/IRoomParticipantsRepository';
import IRoomRepository from '../repositories/IRoomRepository';

interface IRequest {
  userId: string;
  roomId: string;
}

@injectable()
class JoinRoomParticipantsService {
  constructor(
    @inject('RoomParticipantRepository')
    private roomParticipantRepository: IRoomParticipantsRepository,

    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
  ) {}

  public async execute({ userId, roomId }: IRequest): Promise<RoomParticipant> {
    const room = await this.roomRepository.findById(roomId);

    if (!room) {
      throw new AppError('Room not found');
    }

    const count = await this.roomParticipantRepository.count(roomId);

    if (count >= room.capacityLimit) {
      throw new AppError(
        'This room exceeds the maximum number of participants.',
      );
    }

    return this.roomParticipantRepository.create({
      userId,
      roomId,
    });
  }
}

export default JoinRoomParticipantsService;
