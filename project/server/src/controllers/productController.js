const { messages } = require("../helpers")
const { productService } = require("../services");

const getProducts = async (req, res) => {
  try {
    const result = await productService.getProduct();
    res.status(200).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ message: error.message })
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ message: error.message })
  }
};

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const account = req.account
    const result = await productService.createProduct(data, account);
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ message: error.message })
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const account = req.account
    const data = req.body;
    const result = await productService.updateProduct(id, data, account);
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ message: error.message })
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ message: error.message })
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}