const { Product } = require("../../database/models");
const { messages } = require("../../helpers");

const getProductById = async (id) => {
  try {
    const products = await Product.findOne({ where: { id } });
    return messages.success("Products fetched successfully", products);
  } catch (error) {
    console.log(error);
    return messages.error(500, error.message);
  }
};

module.exports = getProductById;
