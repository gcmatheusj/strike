import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import GetAllUsersService from '@modules/users/services/GetAllUsersService';
import GetUserService from '@modules/users/services/GetUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getAllUsers = container.resolve(GetAllUsersService);

    const users = await getAllUsers.execute();

    const usersWithoutPassword = users.map(user => {
      delete user.password;

      return user;
    });

    return response.json(usersWithoutPassword);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const getUser = container.resolve(GetUserService);

    const user = await getUser.execute({ username });

    delete user?.password;

    return response.json(user);
  }

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
}
