import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import GetUserService from './GetUserService';

describe('GetUser', () => {
  it('should be able to list a user by username', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const getUser = new GetUserService(fakeUsersRepository);

    await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    const user = await getUser.execute({ username: 'gcmatheusj' });

    expect(user).toHaveProperty('username');
    expect(user?.username).toBe('gcmatheusj');
  });

  it('should not be able to list a user if not found', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const getUser = new GetUserService(fakeUsersRepository);

    expect(getUser.execute({ username: 'gcmatheusj' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
