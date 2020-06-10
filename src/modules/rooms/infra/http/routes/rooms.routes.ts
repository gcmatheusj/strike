import { Router } from 'express';

import RoomController from '@modules/rooms/infra/http/controllers/RoomController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const roomRouter = Router();
const usersController = new RoomController();

roomRouter.use(ensureAuthenticated);

roomRouter.post('/', usersController.create);

export default roomRouter;
