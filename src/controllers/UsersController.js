import autoBind from 'auto-bind';

/**
   * Creates an instance of UserController.
   */
class UsersController {
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
   * @param {object} next
   *@returns {object} - user
   */
  async getAUser(req, res, next) {
    const { id } = req.params;

    try {
      const user = await this.userService.retrieveUser(id);

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Retrieves user details
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *@returns {object} - user
   */
  async saveUser(req, res, next) {
    const options = req.body;

    try {
      const newUser = await this.userService.newUser(options);

      return res.status(201).json(newUser);
    } catch (error) {
      return next(error);
    }
  }
}

export default UsersController;
