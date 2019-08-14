import { Router } from 'express';

const createUsersRoute = ({ usersController }) => {
  const router = Router();

  router.get('/:id', usersController.getAUser);
  router.post('/', usersController.saveUser);

  return router;
};

export default createUsersRoute;
