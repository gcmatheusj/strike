import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from '@modules/users/services/CreateUsersService';

import FakeRoomRepository from '../repositories/fakes/FakeRoomRepository';
import CreateRoomsService from './CreateRoomsService';

import FakeRoomParticipantRepository from '../repositories/fakes/FakeRoomParticipantsRepository';
import JoinRoomParticipantsService from './JoinRoomParticipantsService';
import LeaveRoomParticipantsService from './LeaveRoomParticipantService';

let fakeRoomRepository: FakeRoomRepository;
let fakeRoomParticipantRepository: FakeRoomParticipantRepository;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;
let createRoom: CreateRoomsService;
let joinRoom: JoinRoomParticipantsService;

describe('LeaveRooms', () => {
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

  it('should be able to leave a room', async () => {
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
});
