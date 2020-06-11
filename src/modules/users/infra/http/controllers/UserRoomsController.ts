import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UserRoomsService from '@modules/users/services/UserRoomsService';

export default class RoomParticipantController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const getRooms = container.resolve(UserRoomsService);

    const rooms = await getRooms.execute({ username });

    return response.json(rooms);
  }
}
