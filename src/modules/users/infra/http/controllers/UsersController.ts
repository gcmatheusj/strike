import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsersService from '@modules/users/services/CreateUsersService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password, mobileToken = '' } = request.body;

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
