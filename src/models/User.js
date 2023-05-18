import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    id: {type: String},
    name: {type: String, required: true},
    email: {type: String, required: true},
    instagram: {type: String},
    instrument: {type: String, required: true},
    leftHanded: {type: Boolean, required: true},
    musicStyle: {type: String},
    nickname: {type: String, required: true},
    phone: {type: String, required: true}
  },
  {
    versionKey: false
  }
);

const users= mongoose.model('users', usersSchema);

export default users;