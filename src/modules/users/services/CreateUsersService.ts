import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  username: string;
  password: string;
  mobileToken?: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    password,
    mobileToken,
  }: IRequest): Promise<User> {
    const checkUsername = await this.userRepository.findByUsername(username);

    if (checkUsername) {
      throw new AppError('Username already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      username,
      password: hashedPassword,
      mobileToken,
    });

    return user;
  }
}

export default CreateUsersService;
