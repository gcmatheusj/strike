import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password, mobileToken = '' } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      username,
      password,
      mobileToken,
    });

    delete user.password;

    return response.json(user);
  }
}
