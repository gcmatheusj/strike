import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserRoomsController from '@modules/users/infra/http/controllers/UserRoomsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();
const usersController = new UsersController();
const userRoomsController = new UserRoomsController();

userRouter.get('/', usersController.index);
userRouter.get('/:username/rooms', userRoomsController.show);
userRouter.get('/:username', usersController.show);
userRouter.post('/', usersController.create);

userRouter.use(ensureAuthenticated);

userRouter.put('/', usersController.update);
userRouter.delete('/', usersController.delete);

export default userRouter;
