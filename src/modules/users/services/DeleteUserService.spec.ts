import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import DeleteUserService from './DeleteUserService';
import GetUserService from './GetUserService';

describe('DeleteUser', () => {
  it('should be able to delete a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const deleteUser = new DeleteUserService(fakeUsersRepository);
    const getUser = new GetUserService(fakeUsersRepository);

    const user = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    expect(await getUser.execute({ username: 'gcmatheusj' })).toHaveProperty(
      'username',
    );

    await deleteUser.execute({ id: user.id });

    expect(getUser.execute({ username: 'gcmatheusj' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
