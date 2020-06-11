import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from '@modules/users/services/CreateUsersService';

import FakeRoomRepository from '../repositories/fakes/FakeRoomRepository';
import CreateRoomsService from './CreateRoomsService';

import FakeRoomParticipantRepository from '../repositories/fakes/FakeRoomParticipantsRepository';
import JoinRoomParticipantsService from './JoinRoomParticipantsService';

let fakeRoomRepository: FakeRoomRepository;
let fakeRoomParticipantRepository: FakeRoomParticipantRepository;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;
let createRoom: CreateRoomsService;
let joinRoom: JoinRoomParticipantsService;

describe('JoinRooms', () => {
  beforeEach(() => {
    fakeRoomRepository = new FakeRoomRepository();
    fakeRoomParticipantRepository = new FakeRoomParticipantRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUsersService(fakeUserRepository, fakeHashProvider);
    createRoom = new CreateRoomsService(fakeRoomRepository);
    joinRoom = new JoinRoomParticipantsService(
      fakeRoomParticipantRepository,
      fakeRoomRepository,
    );
  });

  it('should be able to join an available room', async () => {
    const { id: hostUser } = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    const { id: userId } = await createUser.execute({
      username: 'gaearon',
      password: '123456',
    });

    const { id: roomId } = await createRoom.execute({
      hostUser,
      name: 'Strike Room',
      capacityLimit: 10,
    });

    const roomParticipant = await joinRoom.execute({ userId, roomId });

    expect(roomParticipant.userId).toBe(userId);
    expect(roomParticipant.roomId).toBe(roomId);
  });

  it('should not be able to join an unavailable room', async () => {
    const { id: hostUser } = await createUser.execute({
      username: 'gcmatheusj',
      password: '123456',
    });

    const { id: userId } = await createUser.execute({
      username: 'gaearon',
      password: '123456',
    });

    const { id: roomId } = await createRoom.execute({
      hostUser,
      name: 'Strike Room',
      capacityLimit: 2,
    });

    await joinRoom.execute({ userId, roomId });
    await joinRoom.execute({ userId, roomId });

    expect(joinRoom.execute({ userId, roomId })).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to join a non existing room', async () => {
    const { id: userId } = await createUser.execute({
      username: 'gaearon',
      password: '123456',
    });

    expect(
      joinRoom.execute({ userId, roomId: 'non-existing-room' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
