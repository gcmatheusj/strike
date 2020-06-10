import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from '@modules/users/services/CreateUsersService';
import FakeRoomRepository from '../repositories/fakes/FakeRoomRepository';
import CreateRoomsService from './CreateRoomsService';

describe('CreateRooms', () => {
  it('should be able to create a new room', async () => {
    const fakeRoomRepository = new FakeRoomRepository();
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createRoom = new CreateRoomsService(fakeRoomRepository);

    const { id } = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    const room = await createRoom.execute({
      hostUser: id,
      name: 'Strike Room',
      capacityLimit: 10,
    });

    expect(room).toHaveProperty('id');
    expect(room.name).toBe('Strike Room');
    expect(room.capacityLimit).toBe(10);
    expect(room.hostUser).toBe(id);
  });
});
