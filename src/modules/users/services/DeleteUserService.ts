import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    this.userRepository.delete(id);
  }
}

export default DeleteUserService;
