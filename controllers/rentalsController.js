import db from "./../db.js"

export async function listaRentals(req, res) {
  const listaRentals = []
  try {
    const result = await db.query(`
        SELECT rentals.*,

        games.name AS "gameName",
        customers.name AS "customerName",

        games."categoryId",
        categories.name AS "CategoryName"

        FROM rentals

        JOIN games ON rentals."gameId" = games.id
        JOIN customers ON rentals."customerId" = customers.id
        JOIN categories ON games."categoryId" = categories.id

    `)

    for (let rental of result.rows) {
      listaRentals.push({
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: rental.rentDate,
        daysRented: rental.daysRented,
        returnDate: rental.returnDate,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,

        customer: {
          id: rental.customerId,
          name: rental.customerName,
        },

        game: {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.CategoryName,
        },
      })
    }

    return res.send(listaRentals)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export async function criaRental(req, res) {
  const { customerId, gameId, daysRented } = req.body
  const { originalPrice, rentDate } = res.locals

  try {
    await db.query(
      `
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);
        `,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    )

    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    return res.status(500).send("Ocorreu um erro ao registrar o aluguel!")
  }
}

export async function finalizaRental(req, res) {
  const { id } = req.params
  const returnDate = new Date().toISOString().slice(0, 10)

  try {
    const result = await db.query(
      `UPDATE rentals 
      SET "returnDate" = $1, "delayFee" = GREATEST((($1 - (rentals."rentDate" + rentals."daysRented")) * rentals."originalPrice"),0)
      WHERE id = $2`,
      [returnDate, id]
    )
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    return res.status(500).send("Ocorreu um erro ao finalizar o aluguel!")
  }
}

export async function excluirRental(req, res) {
  const { id } = req.params

  try {
    const result = await db.query(`DELETE FROM rentals WHERE id = $1`, [id])

    if (result.rowCount === 0) {
      return res.sendStatus(404)
    }
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    return res.status(500).send("Ocorreu um erro ao excluir o aluguel!")
  }
}
