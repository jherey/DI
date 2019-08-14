import BaseRepository from './BaseRepository';
import userSchema from '../schemas/UserSchema';

/**
 * @description BaseRepository
 * @class BaseRepository
 */
class UserRepository extends BaseRepository {
  /**
   * TodoRepository constructor
   */
  constructor({ db }) {
    super('User', userSchema, db);
  }
}

export default UserRepository;
