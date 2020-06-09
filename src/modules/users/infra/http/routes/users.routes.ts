import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();
const usersController = new UsersController();

userRouter.get('/', usersController.index);
userRouter.get('/:username', usersController.show);
userRouter.post('/', usersController.create);

userRouter.use(ensureAuthenticated);

userRouter.put('/', usersController.update);
userRouter.delete('/', usersController.delete);

export default userRouter;
