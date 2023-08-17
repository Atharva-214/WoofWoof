const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;