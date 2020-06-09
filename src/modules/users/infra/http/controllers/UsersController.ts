import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import GetAllUsersService from '@modules/users/services/GetAllUsersService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password, mobileToken } = request.body;

    const createUsersService = container.resolve(CreateUsersService);

    const user = await createUsersService.execute({
      username,
      password,
      mobileToken,
    });

    delete user.password;

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const getAllUsers = container.resolve(GetAllUsersService);

    const users = await getAllUsers.execute();

    const usersWithoutPassword = users.map(user => {
      delete user.password;

      return user;
    });

    return response.json(usersWithoutPassword);
  }
}
