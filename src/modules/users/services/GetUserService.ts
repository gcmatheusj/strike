import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  username: string;
}

@injectable()
class GetUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ username }: IRequest): Promise<User | undefined> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    return user;
  }
}

export default GetUserService;
