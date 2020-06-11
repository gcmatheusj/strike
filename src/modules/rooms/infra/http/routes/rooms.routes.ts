import { Router } from 'express';

import RoomController from '@modules/rooms/infra/http/controllers/RoomController';
import RoomParticipantController from '@modules/rooms/infra/http/controllers/RoomParticipantController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const roomRouter = Router();
const roomsController = new RoomController();
const roomParticipantController = new RoomParticipantController();

roomRouter.get('/:id', roomsController.show);

roomRouter.use(ensureAuthenticated);

roomRouter.post('/:id/join', roomParticipantController.create);
roomRouter.delete('/:id/leave', roomParticipantController.delete);
roomRouter.post('/', roomsController.create);
roomRouter.put('/:id', roomsController.update);

export default roomRouter;
