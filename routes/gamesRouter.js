import { Router } from "express"

import { getGames, createGame } from "./../controllers/gamesController.js"
import { postValidator } from "../middlewares/gamesMiddleware.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", postValidator, createGame)

export default gamesRouter
