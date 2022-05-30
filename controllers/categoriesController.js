import db from "./../db.js"

export async function getCategories(req, res) {
  try {
    const result = await db.query("SELECT * FROM categories")
    res.send(result.rows)
  } catch (e) {
    console.log(e)
    res.status(500).send("Ocorreu um erro ao obter as categorias!")
  }
}

export async function createCategorie(req, res) {
  const { name } = req.body
  try {
    const result = await db.query(
      `
        INSERT INTO categories (name) VALUES ($1);
      `,
      [name]
    )

    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    res.status(500).send("Ocorreu um erro ao registrar a categoria!", e)
  }
}
