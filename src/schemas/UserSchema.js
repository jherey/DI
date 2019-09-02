import BaseSchema from './BaseSchema';

const userSchema = new BaseSchema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  sex: { type: String, enum: ['male', 'female'] },
});

export default userSchema;
