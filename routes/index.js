const router = require("express").Router();
const Controller = require("../controllers");
const UserController = require("../controllers/userController")
const authentication = require('../middlewares/authentication')
const errorHandler = require("../middlewares/errorHandler");

router.post("/v1/user/create", UserController.register);

router.use(authentication);

router.get("/v1/user/balance", Controller.readBalance);
router.post("/v1/user/balance", Controller.addBalance);
router.post("/v1/user/transfer", Controller.transferBalance);
router.use(errorHandler)


module.exports = router;