import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import AuthenticateUsersService from './AuthenticateUsersService';

describe('AuthenticateUsers', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    const user = await authenticateUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        username: 'gcmatheusj',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        username: 'gcmatheusj',
        password: 'abc123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
