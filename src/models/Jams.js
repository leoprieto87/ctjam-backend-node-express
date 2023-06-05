import mongoose from "mongoose";

const jamSchema = new mongoose.Schema({
  data: { type: String, required: true },
  name: { type: String, required: true },
  theme: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  playList: [
    {
      usersBand: {
        vocal: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        guitar: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        guitar2: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        bass: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        drums: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        keys: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
      },
      artist: { type: String, required: true },
      song: { type: String, required: true },
    },
  ],
  urlPlayList: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  step: { type: String, enum: ['suggestion', 'choice'], required: true },
});

const jams= mongoose.model('jams', jamSchema);

export default jams;