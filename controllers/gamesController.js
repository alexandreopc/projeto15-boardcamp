import db from "./../db.js"

export async function getGames(req, res) {
  try {
    const result = await db.query("SELECT * FROM games")
    res.send(result.rows)
  } catch (e) {
    console.log(e)
    res.status(500).send("Ocorreu um erro ao obter os jogos!")
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body
  try {
    const result = await db.query(
      `
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);
      `,
      [name, image, stockTotal, categoryId, pricePerDay]
    )
    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    res.status(500).send("Ocorreu um erro ao registrar jogo!")
  }
}
