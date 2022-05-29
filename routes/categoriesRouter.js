import { Router } from "express"

import {
  getCategories,
  createCategorie,
} from "./../controllers/categoriesController.js"
import { validateCategory } from "./../middlewares/categoriesValidator.js"

const categoriesRouter = Router()

categoriesRouter.get("/categories", getCategories)
categoriesRouter.post("/categories", validateCategory, createCategorie)

export default categoriesRouter
