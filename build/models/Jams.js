"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var jamsSchema = new mongoose_1.default.Schema({
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
                vocal: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', required: true },
                guitar: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', required: true },
                guitar2: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', required: true },
                bass: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', required: true },
                drums: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', required: true },
                keys: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', required: true },
            },
        },
    ],
    urlPlayList: { type: String, required: true },
    isActive: { type: Boolean, required: true },
});
var jams = mongoose_1.default.model('jams', jamsSchema);
exports.default = jams;
