import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { username } });
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }
}

export default UserRepository;
