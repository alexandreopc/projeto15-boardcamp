import joi from "joi"

import db from "../db.js"

export async function validaCustumer(req, res, next) {
  const { name, phone, cpf, birthday } = req.body

  const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joi.string().length(10).required(),
  })

  const validation = customerSchema.validate(req.body)
  if (validation.error) {
    return res.status(400).send(validation.error.details)
  }
  next()
}

export async function verificaCPF(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM customers WHERE cpf = $1 ", [
      req.body.cpf,
    ])
    if (result.rowCount > 0) {
      return res.status(409).send("CPF já em uso")
    }
  } catch (e) {
    res.status(500).send(e)
  }
  next()
}

export async function verificaID(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM customers WHERE id = $1 ", [
      req.params.id,
    ])
    if (result.rowCount === 0) {
      return res.status(404).send("ID nao existe")
    }
    res.locals.id = req.params.id
  } catch (e) {
    res.status(500).send(e)
  }
  next()
}
