import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthencicateUsersService from '@modules/users/services/AuthenticateUsersService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUsers = container.resolve(AuthencicateUsersService);

    const { user, token } = await authenticateUsers.execute({
      username,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
