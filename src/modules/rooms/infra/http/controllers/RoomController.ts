import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRoomsService from '@modules/rooms/services/CreateRoomsService';

export default class RoomController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, capacityLimit } = request.body;

    const createRoom = container.resolve(CreateRoomsService);

    const room = await createRoom.execute({
      hostUser: id,
      name,
      capacityLimit,
    });

    return response.json(room);
  }
}
