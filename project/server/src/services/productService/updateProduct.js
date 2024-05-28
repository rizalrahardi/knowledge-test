const { Product, sequelize } = require("../../database/models")
const { messages } = require("../../helpers")

const updateProduct = async (id, data, account) => {
  try {
    const userId = account.id
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return messages.error(404, "Product not found");
    }
    const { name, price, stock, description } = data;

    await sequelize.transaction(async (t) => {
      await Product.update({ name, price, stock, description, userId: userId }, { where: { id } }, { transaction: t });
    })

    const updateProduct = await Product.findOne({ where: { id } });
    return messages.success("Product updated successfully", updateProduct);

  } catch (error) {
    console.log(error)
    return messages.error(500, error.message);
  }
}

module.exports = updateProduct