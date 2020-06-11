import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Room from '@modules/rooms/infra/typeorm/entities/Room';
import IUserRepository from '../repositories/IUserRepository';

interface IUserRooms {
  id: string;
  username: string;
  mobileToken?: string;
  createdAt: Date;
  updatedAt: Date;
  rooms: Room[];
}

interface IRequest {
  username: string;
}

@injectable()
class UsersRoomService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ username }: IRequest): Promise<IUserRooms> {
    const [user] = await this.userRepository.findRoomsByUsername(username);

    if (!user) {
      throw new AppError('User not found.');
    }

    const rooms = user.rooms.map(room => {
      return {
        ...room.room,
      };
    });

    return {
      id: user.id,
      username: user.username,
      mobileToken: user.mobileToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      rooms,
    };
  }
}

export default UsersRoomService;
