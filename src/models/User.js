import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    id: {type: String},
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String},
    instagram: {type: String},
    instrument: {type: String, required: true},
    isAdm: {type: Boolean, required: true},
    leftHanded: {type: Boolean, required: true},
    musicStyle: {type: String},
    myJams: {type: mongoose.Schema.Types.ObjectId, ref: 'jams'},
    nickname: {type: String, required: true},
    phone: {type: String, required: true}
  },
  {
    versionKey: false
  }
);

const users= mongoose.model('users', usersSchema);

export default users;