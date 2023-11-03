const {Pool} = require("pg")


const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "akmal02032009",
    database: "test"
})



module.exports = pool