import mongoose from "mongoose";

mongoose.connect('mongodb+srv://ctjam:leo123@ctjam.bnum6dr.mongodb.net/ctjam-node')

const db = mongoose.connection

export default db