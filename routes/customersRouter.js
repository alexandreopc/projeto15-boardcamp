import { Router } from "express"

import {
  atualizaCustomer,
  listaCustomers,
  listaCustomerID,
  criaCustomer,
} from "./../controllers/customersController.js"
import {
  validaCustumer,
  verificaCPF,
  verificaID,
} from "./../middlewares/customersMiddleware.js"

const customersRouter = Router()

customersRouter.get("/customers", listaCustomers)
customersRouter.get("/customers/:id", verificaID, listaCustomerID)
customersRouter.post("/customers", validaCustumer, verificaCPF, criaCustomer)
customersRouter.put(
  "/customers/:id",
  validaCustumer,
  verificaCPF,
  verificaID,
  atualizaCustomer
)

export default customersRouter
