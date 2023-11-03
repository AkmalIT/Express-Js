require("dotenv").config()
const Application = require("./express/application")
const jsonParse = require("./express/jsonParser")
const urlParse = require("./express/urlParser")
const router = require('./routes/user-routes')

const PORT = process.env.PORT
const app = new Application()


app.use(jsonParse);
app.use(urlParse('http://localhost:5050'))





app.addRouter(router)



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})