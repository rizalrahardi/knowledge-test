const router = require("express").Router();
const { profileController } = require("../controllers")
const { authentication } = require("../middlewares")

router.get("/", authentication, profileController.getProfile);
router.patch("/", authentication, profileController.updateProfile)

module.exports = router