import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from '@modules/users/services/CreateUsersService';

import FakeRoomRepository from '../repositories/fakes/FakeRoomRepository';
import CreateRoomsService from './CreateRoomsService';
import GetRoomService from './GetRoomService';

describe('GetRoom', () => {
  it('should be able to list a room by id', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeRoomRepository = new FakeRoomRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createRoom = new CreateRoomsService(fakeRoomRepository);
    const getRoom = new GetRoomService(fakeRoomRepository);

    const { id: hostUser } = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    const { id } = await createRoom.execute({
      hostUser,
      name: 'Strike Room',
      capacityLimit: 10,
    });

    const room = await getRoom.execute({ id });

    expect(room?.name).toBe('Strike Room');
  });

  it('should not be able to list a room if not found', async () => {
    const fakeRoomRepository = new FakeRoomRepository();
    const getRoom = new GetRoomService(fakeRoomRepository);

    expect(getRoom.execute({ id: 'any-id' })).rejects.toBeInstanceOf(AppError);
  });
});
