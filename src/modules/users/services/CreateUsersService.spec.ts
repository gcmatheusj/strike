import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';

describe('CreateUsers', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
      mobileToken: '34be019ef5eb',
    });

    expect(user).toHaveProperty('id');
    expect(user.username).toBe('gcmatheusj');
  });

  it('should not be able to create a new user with same username from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
      mobileToken: '34be019ef5eb',
    });

    expect(
      createUser.execute({
        username: 'gcmatheusj',
        password: '123456',
        mobileToken: '34be019ef5eb',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
