import mongoose from "mongoose";

const jamSchema = new mongoose.Schema({
  data: { type: String, required: true },
  name: { type: String, required: true },
  theme: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  playList: [
    {
      usersBand: {
        vocal: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        guitar: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        guitar2: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        bass: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        drums: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        keys: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      },
      artistName: { type: String, required: true },
      songName: { type: String, required: true },
      _id: { type: String }
    },
  ],
  urlPlayList: { type: String },
  isActive: { type: Boolean, required: true },
  step: { type: String, enum: ['suggestion', 'choice'], required: true },
});

const jams= mongoose.model('jams', jamSchema);

export default jams;