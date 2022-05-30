import joi from "joi"
import dayjs from "dayjs"

import db from "../db.js"

export async function validaRental(req, res, next) {
  const { daysRented } = req.body
  const rentalSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().required(),
  })

  const validation = rentalSchema.validate(req.body)
  if (validation.error) return res.status(400).send(validation.error.details)
  if (daysRented < 1) return res.sendStatus(400)
  next()
}

export async function verificaCustomerId(req, res, next) {
  const { customerId } = req.body
  try {
    const result = await db.query("SELECT * FROM customers WHERE id = $1 ", [
      customerId,
    ])
    if (result.rowCount === 0) {
      return res.status(400).send("Cliente nao existe")
    }
  } catch (e) {
    res.status(500).send(e)
  }
  next()
}

export async function verificaGameId(req, res, next) {
  const { customerId, gameId, daysRented } = req.body
  try {
    const result = await db.query("SELECT * FROM games WHERE id = $1 ", [
      gameId,
    ])
    if (result.rowCount === 0) {
      return res.status(400).send("Game nao existe")
    }
    const originalPrice =
      parseInt(daysRented) * parseInt(result.rows[0].pricePerDay)
    const rentDate = new Date().toISOString().slice(0, 10)

    res.locals.originalPrice = originalPrice
    res.locals.rentDate = rentDate
  } catch (e) {
    res.status(500).send(e)
  }
  next()
}

export async function verificaDispGame(req, res, next) {
  const { customerId, gameId, daysRented } = req.body
  try {
    const games = await db.query("SELECT * FROM games WHERE id = $1 ", [gameId])
    const estoque = games.rows[0].stockTotal

    const rentals = await db.query(
      `SELECT * FROM rentals WHERE "gameId" = $1`,
      [gameId]
    )
    const qntdAlugada = rentals.rows.length

    if (qntdAlugada >= estoque) {
      console.log("passou")
      return res.sendStatus(400)
    }
  } catch (e) {
    res.status(500).send(e)
  }
  next()
}

export async function verificaRental(req, res, next) {
  const { id } = req.params
  try {
    const result = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id])

    if (result.rows[0].returnDate) return res.sendStatus(400)
    if (!result.rowCount) return res.sendStatus(404)
  } catch (e) {
    res.status(500).send(e)
  }
  next()
}
