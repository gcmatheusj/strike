import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import GetAllUsersService from './GetAllUsersService';

describe('GetAllUsers', () => {
  it('should be able to list all users', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const getAllUsers = new GetAllUsersService(fakeUsersRepository);

    await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    await createUser.execute({
      username: 'gaearon',
      password: '123456',
    });

    await createUser.execute({
      username: 'dexh',
      password: '123456',
    });

    expect(await getAllUsers.execute()).toHaveLength(3);
  });
});
