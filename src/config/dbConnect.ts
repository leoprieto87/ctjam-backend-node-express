require("dotenv").config()
import mongoose from "mongoose";

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@mongodb.ctjam.kinghost.net:27017/${dbUser}`)

const db = mongoose.connection

export default db