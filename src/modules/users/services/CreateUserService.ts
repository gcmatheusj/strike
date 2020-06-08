import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  username: string;
  password: string;
  mobileToken?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
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

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      username,
      password: hashedPassword,
      mobileToken,
    });

    return user;
  }
}

export default CreateUserService;
