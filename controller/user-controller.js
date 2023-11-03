const db = require("../db-config/db");

const getUsers =  async (req, res) => {
        const users = await db.query('SELECT * FROM userr')
        return res.send(users.rows)
    
}

const createUser = async  (req, res) => {
    const {name, password} = req.body
    const user = await db.query('INSERT INTO userr (name, password) values ($1,$2) RETURNING *', [name, password])
    return res.send(user.rows);
}

module.exports = {
    getUsers,
    createUser,
}