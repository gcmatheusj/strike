import { injectable, inject } from 'tsyringe';

import IRoomParticipantsRepository from '../repositories/IRoomParticipantsRepository';

interface IRequest {
  userId: string;
  roomId: string;
}

@injectable()
class LeaveRoomParticipantsService {
  constructor(
    @inject('RoomParticipantRepository')
    private roomParticipantRepository: IRoomParticipantsRepository,
  ) {}

  public async execute({ userId, roomId }: IRequest): Promise<void> {
    return this.roomParticipantRepository.delete({
      userId,
      roomId,
    });
  }
}

export default LeaveRoomParticipantsService;
