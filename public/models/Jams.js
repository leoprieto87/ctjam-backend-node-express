"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jamSchema = new mongoose_1.default.Schema({
    data: { type: String, required: true },
    name: { type: String, required: true },
    theme: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    playList: [
        {
            usersBand: {
                vocal: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' },
                guitar: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' },
                guitar2: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' },
                bass: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' },
                drums: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' },
                keys: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' },
            },
            artistName: { type: String, required: true },
            songName: { type: String, required: true },
            _id: { type: String }
        },
    ],
    urlPlayList: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    step: { type: String, enum: ['suggestion', 'choice'], required: true },
});
const jams = mongoose_1.default.model('jams', jamSchema);
exports.default = jams;
