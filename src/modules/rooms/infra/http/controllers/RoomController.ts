import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRoomsService from '@modules/rooms/services/CreateRoomsService';
import GetRoomService from '@modules/rooms/services/GetRoomService';

export default class RoomController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getRoom = container.resolve(GetRoomService);

    const room = await getRoom.execute({ id });

    return response.json(room);
  }

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
