import joi from "joi"

import db from "../db.js"

export async function postValidator(req, res, next) {
  const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().positive().integer().required(),
    categoryId: joi.number().positive().integer().required(),
    pricePerDay: joi.number().positive().integer().required(),
  })

  const validation = gameSchema.validate(req.body)
  if (validation.error) {
    return res.status(400).send(validation.error.details)
  }

  try {
    const result = await db.query("SELECT * FROM categories WHERE id = $1", [
      req.body.categoryId,
    ])
    if (result.rowCount === 0) {
      return res.status(400).send("Id de categoria nao existente")
    }
  } catch (e) {
    res.status(500).send(e)
  }

  try {
    const result = await db.query("SELECT * FROM games WHERE name = $1 ", [
      req.body.name,
    ])
    if (result.rowCount > 0) {
      return res.status(409).send("Jogo já existente")
    }
  } catch (e) {
    res.status(500).send(e)
  }
  next()
}
