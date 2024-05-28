const { Product, sequelize } = require("../../database/models");
const { messages } = require("../../helpers");

const createProduct = async (data, account) => {
  try {
    const userId = account.id
    const { name, price, stock, description } = data;

    if (!name || !price || !stock || !description) {
      return messages.error(400, "All fields are required");
    }

    let product;
    await sequelize.transaction(async (t) => {
      product = await Product.create({
        name,
        price,
        stock,
        description,
        userId: userId
      }, { transaction: t });
    })
    console.log("ini product", product)
    return messages.success("Product created successfully", product);

  } catch (error) {
    console.log(error)
    return messages.error(500, error.message);
  }
}

module.exports = createProduct