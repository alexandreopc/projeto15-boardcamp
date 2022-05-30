import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"

import router from "./routes/index.js"

const app = express()
app.use(cors())
app.use(json())
dotenv.config()

// routes
app.use(router)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Servidor em pé na porta ${port}`))
