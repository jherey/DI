import { Router } from 'express';

const createProductsRoute = ({ productsController }) => {
  const router = Router();

  router.get('/:id', productsController.getProduct);
  router.get('/', productsController.getAllProducts);

  return router;
};

export default createProductsRoute;
