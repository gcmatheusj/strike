import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findAll(): Promise<User[]>;
  findByUsername(username: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}
