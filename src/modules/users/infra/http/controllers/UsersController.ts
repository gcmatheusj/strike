import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import GetAllUsersService from '@modules/users/services/GetAllUsersService';
import GetUserService from '@modules/users/services/GetUserService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

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

    const createUsers = container.resolve(CreateUsersService);

    const user = await createUsers.execute({
      username,
      password,
      mobileToken,
    });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { mobileToken, oldPassword, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      id,
      mobileToken,
      oldPassword,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ id });

    return response.send({});
  }
}
