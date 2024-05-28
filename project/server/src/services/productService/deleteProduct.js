const { Product, sequelize } = require("../../database/models");
const { messages } = require("../../helpers");

const deleteProduct = async (id) => {
  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return messages.error(404, "Product not found");
    }

    await sequelize.transaction(async (t) => {
      await Product.destroy({ where: { id } }, { transaction: t });
    })
    return messages.success("Product deleted successfully");
  } catch (error) {
    console.log(error)
    return messages.error(500, error.message);
  }
}

module.exports = deleteProduct