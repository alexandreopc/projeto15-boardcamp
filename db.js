import dotenv from "dotenv"
import pg from "pg"

dotenv.config()

const { Client } = pg
const connectionString = process.env.DATABASE_URL
const db = new Client({ connectionString })

try {
  await db.connect()
  console.log(`Conectado ao banco de dados`)
} catch (e) {
  console.log(`Erro ao conectar no banco de dados: ${e}`, e)
}

export default db
