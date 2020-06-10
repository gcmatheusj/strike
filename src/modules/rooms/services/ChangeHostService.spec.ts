import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from '@modules/users/services/CreateUsersService';

import FakeRoomRepository from '../repositories/fakes/FakeRoomRepository';
import CreateRoomsService from './CreateRoomsService';
import ChangeHostService from './ChangeHostService';

describe('ChangeHost', () => {
  it('should be able to changes the host of the user from the current user to another user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeRoomRepository = new FakeRoomRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createRoom = new CreateRoomsService(fakeRoomRepository);
    const changeHost = new ChangeHostService(fakeRoomRepository);

    const { id: oldHostUser } = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    const { id: hostUser } = await createUser.execute({
      username: 'gaearon',
      password: '123456',
    });

    const { id } = await createRoom.execute({
      hostUser: oldHostUser,
      name: 'Strike Room',
      capacityLimit: 10,
    });

    const room = await changeHost.execute({ id, oldHostUser, hostUser });

    expect(room?.hostUser).toBe(hostUser);
  });

  it('should not be able to changes the host of the user if room not found', async () => {
    const fakeRoomRepository = new FakeRoomRepository();
    const changeHost = new ChangeHostService(fakeRoomRepository);

    expect(
      changeHost.execute({
        id: 'wrong-id',
        oldHostUser: 'wrong-old-host',
        hostUser: 'new-host-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
