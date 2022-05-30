import db from "./../db.js"

export async function listaCustomers(req, res) {
  try {
    const result = await db.query("SELECT * FROM customers")
    res.send(result.rows)
  } catch (e) {
    console.log(e)
    res.status(500).send("Ocorreu um erro ao obter os clientes!")
  }
}

export async function listaCustomerID(req, res) {
  const { id } = res.locals
  try {
    const result = await db.query("SELECT * FROM customers WHERE id = $1", [id])
    res.send(result.rows[0])
  } catch (e) {
    console.log(e)
    res.status(500).send("Ocorreu um erro ao obter o cliente!")
  }
}

export async function criaCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body
  try {
    const result = await db.query(
      `
        INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);
      `,
      [name, phone, cpf, birthday]
    )
    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    res.status(500).send("Ocorreu um erro ao registrar o cliente!")
  }
}

export async function atualizaCustomer(req, res) {
  const { id } = res.locals
  console.log(id)
  const { name, phone, cpf, birthday } = req.body
  try {
    const result = await db.query(
      `
    UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
      [name, phone, cpf, birthday, id]
    )
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.status(500).send("Ocorreu um erro ao registrar o cliente!")
  }
}
