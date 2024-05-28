const router = require("express").Router();
const { productController } = require("../controllers")
const { authentication } = require("../middlewares")

router.get("/", authentication, productController.getProducts);
router.get("/:id", authentication, productController.getProductById);
router.post("/", authentication, productController.createProduct);
router.patch("/:id", authentication, productController.updateProduct);
router.delete("/:id", authentication, productController.deleteProduct);

module.exports = router