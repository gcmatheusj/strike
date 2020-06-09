import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';
import UpdateProfileService from './UpdateProfileService';

describe('UpdateProfile', () => {
  it('should be able to update mobile token', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const { id } = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    const user = await updateProfile.execute({
      id,
      mobileToken: '34be019ef5eb',
    });

    expect(user.mobileToken).toBe('34be019ef5eb');
  });

  it('should be able to update the password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const { id } = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    const user = await updateProfile.execute({
      id,
      oldPassword: '123456',
      password: '123123',
    });

    expect(user.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const { id } = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        id,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const { id } = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        id,
        oldPassword: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update if the user is not found', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      updateProfile.execute({
        id: 'invalid-id',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
