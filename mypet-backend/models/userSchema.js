const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  idSocial: String,
  username: String,
  fName : String,
  lName : String,
  phoneNumber : String,
  age : String,
  petBreed : String,
  photo: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  admin: Boolean
}, { versionKey: false });

// Create Model
module.exports  = mongoose.model('users', userSchema);
