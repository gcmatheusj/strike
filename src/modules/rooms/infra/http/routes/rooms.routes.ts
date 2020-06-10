import { Router } from 'express';

import RoomController from '@modules/rooms/infra/http/controllers/RoomController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const roomRouter = Router();
const usersController = new RoomController();

roomRouter.get('/:id', usersController.show);

roomRouter.use(ensureAuthenticated);

roomRouter.post('/', usersController.create);
roomRouter.put('/:id', usersController.update);

export default roomRouter;
