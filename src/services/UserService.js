import autoBind from 'auto-bind';

/**
   * Creates an instance of UserService.
   */
class UserService {
  /**
   * Creates an instance of UserService.
   * @param {Object} params
   */
  constructor({ userRepository, redis, jwt, agenda }) {
    this.userRepository = userRepository;
    this.redis = redis;
    this.jwt = jwt;
    this.agenda = agenda;
    autoBind(this);
  }

  /**
   * Retrieves user details
   * @param {number} id
   *@returns {object} - user
   */
  async retrieveUser(id) {
    let user;
    // retrieve user from redis
    user = await this.redis.getObject('id', id);
    if (user && Object.entries(user).length > 0) {
      return user;
    }

    user = await this.userRepository.findById(id);
    return user;
  }

  /**
   * Retrieves user details
   * @param {object} options
   *@returns {object} - user
   */
  async newUser(options) {
    const user = await this.userRepository.create(options);

    const { id, name, age, email } = user;
    // save user in Redis
    await this.redis.setObject('id', id, user, 86400);

    const token = await this.jwt.sign({ name, age });
    this.agenda.now('send-email', { email, name });

    return { token };
  }
}

export default UserService;
