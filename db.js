import dotenv from "dotenv"
import pg from "pg"

dotenv.config()

const { Pool } = pg
const db = new Pool({
  host: "localhost",
  port: process.env.PORT,
  user: "postgres",
  password: "postgres", //trocar?
  database: "boardcamp",
})

export default db
