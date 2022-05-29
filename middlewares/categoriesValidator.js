import joi from "joi"

import db from "../db.js"

export async function validateCategory(req, res, next) {
  const categorieSchema = joi.object({
    name: joi.string().required(),
  })
  const validation = categorieSchema.validate(req.body)
  if (validation.error) {
    return res.status(400).send(validation.error.details)
  }

  try {
    const result = await db.query("SELECT * FROM categories WHERE name = $1 ", [
      req.body.name,
    ])
    if (result.rowCount > 0) {
      return res.status(409).send("Categoria já existente")
    }
  } catch (e) {
    res.status(500).send(e)
  }
  next()
}
