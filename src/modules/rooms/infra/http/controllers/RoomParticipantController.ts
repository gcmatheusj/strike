import { Request, Response } from 'express';
import { container } from 'tsyringe';

import JoinRoomParticipantsService from '@modules/rooms/services/JoinRoomParticipantsService';

export default class RoomParticipantController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { id: roomId } = request.params;

    const joinRoom = container.resolve(JoinRoomParticipantsService);

    const participant = await joinRoom.execute({ userId, roomId });

    return response.json(participant);
  }
}
