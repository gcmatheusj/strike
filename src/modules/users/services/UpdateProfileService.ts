import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  mobileToken?: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private useRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    mobileToken,
    oldPassword,
    password,
  }: IRequest): Promise<User> {
    const user = await this.useRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (password && !oldPassword) {
      throw new AppError(
        'You need to inform old password to set a new password.',
      );
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Invalid old password.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.mobileToken = mobileToken as string;

    return this.useRepository.save(user);
  }
}

export default UpdateProfileService;
