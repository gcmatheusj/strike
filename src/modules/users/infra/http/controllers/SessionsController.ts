import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthencicateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserService = container.resolve(AuthencicateUserService);

    const { user, token } = await authenticateUserService.execute({
      username,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
