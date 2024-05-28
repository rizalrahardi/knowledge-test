const { Product } = require("../../database/models");
const { messages } = require("../../helpers");
const { Op } = require("sequelize");

const getProduct = async () => {
  try {
    const products = await Product.findAll();
    return messages.success("Products fetched successfully", products);
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message);
  }
};

module.exports = getProduct;
