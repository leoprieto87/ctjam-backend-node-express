
import mongoose from "mongoose";

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

mongoose.connect(`mongodb://ctjam01:jam123@mongo71-farm10.kinghost.net:27017/ctjam01`)
// mongodb://ctjam01:jam123@mongo71-farm10.kinghost.net:27017/ctjam01?authSource=ctjam01
const db = mongoose.connection

export default db