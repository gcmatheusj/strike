import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

const userRouter = Router();
const usersController = new UsersController();

userRouter.get('/', usersController.index);
userRouter.get('/:username', usersController.show);
userRouter.post('/', usersController.create);

export default userRouter;
