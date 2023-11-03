const Router = require("../express/router")
const controller = require("../controller/user-controller")
const router = new Router()



router.get('/users', controller.getUsers)

router.post('/users', controller.createUser)



module.exports = router