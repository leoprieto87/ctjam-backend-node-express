
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

console.log('dbUser', dbUser)
console.log('dbPassword', dbPassword)

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@mongodb.ctjam.com.br/${dbUser}`)

const db = mongoose.connection

export default db