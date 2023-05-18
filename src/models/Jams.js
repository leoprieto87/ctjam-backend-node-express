import mongoose from "mongoose";

const jamsSchema = new mongoose.Schema({
    data: { type: String, required: true },
    name: { type: String, required: true },
    theme: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    playList: [
      {
        artist: { type: String, required: true },
        song: { type: String, required: true },
        usersBand: {
          vocal: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
          guitar: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
          guitar2: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
          bass: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
          drums: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
          keys: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        },
      },
    ],
    urlPlayList: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  });

const jams= mongoose.model('jams', jamsSchema);

export default jams;