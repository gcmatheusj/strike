import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUsersService';

describe('CreateUsers', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
      mobileToken: '34be019ef5eb',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('mobileToken');
  });

  it('should not be able to create a new user with same username from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

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
