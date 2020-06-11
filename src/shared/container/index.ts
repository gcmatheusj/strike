import { container } from 'tsyringe';

import '@modules/users/providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IRoomRepository from '@modules/rooms/repositories/IRoomRepository';
import RoomRepository from '@modules/rooms/infra/typeorm/repositories/RoomRepository';

import IRoomParticipantsRepository from '@modules/rooms/repositories/IRoomParticipantsRepository';
import RoomParticipantRepository from '@modules/rooms/infra/typeorm/repositories/RoomParticipantsRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IRoomRepository>('RoomRepository', RoomRepository);

container.registerSingleton<IRoomParticipantsRepository>(
  'RoomParticipantRepository',
  RoomParticipantRepository,
);
