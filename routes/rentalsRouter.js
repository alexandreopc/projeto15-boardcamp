import { Router } from "express"

import {
  criaRental,
  listaRentals,
  finalizaRental,
  excluirRental,
} from "./../controllers/rentalsController.js"
import {
  validaRental,
  verificaGameId,
  verificaCustomerId,
  verificaDispGame,
  verificaRental,
} from "./../middlewares/rentalsMiddleware.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", listaRentals)
rentalsRouter.post(
  "/rentals",
  validaRental,
  verificaGameId,
  verificaCustomerId,
  verificaDispGame,
  criaRental
)
rentalsRouter.post("/rentals/:id/return", verificaRental, finalizaRental)
rentalsRouter.delete("/rentals/:id", verificaRental, excluirRental)

export default rentalsRouter
