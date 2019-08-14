import autoBind from 'auto-bind';

/**
   * Creates an instance of UserController.
   */
class ProductsController {
  /**
   * Creates an instance of UserController.
   * @param {object} param
   * @memberof UsersController
   */
  constructor({ userService }) {
    this.userService = userService;
    autoBind(this);
  }

  /**
   * Retrieves user details
   * @param {object} req
   * @param {object} res
   *@returns {object} - user
   */
  async getProduct(req, res) {
    try {
      // const user = await this.userService.retrieveUser(id);

      return res.status(200).json({ productName: 'hello' });
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * Retrieves user details
   * @param {object} req
   * @param {object} res
   *@returns {object} - user
   */
  async getAllProducts(req, res) {
    try {
      // const user = await this.userService.retrieveUser(id);

      return res.status(200).json({ productName: 'chidimma' });
    } catch (error) {
      return res.json(error);
    }
  }
}

export default ProductsController;
