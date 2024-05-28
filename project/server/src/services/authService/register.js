const { User, sequelize } = require("../../database/models");
const { messages, utils } = require("../../helpers");

const register = async (data) => {
  try {
    const { name, email, password, gender } = data;

    if (!name || !email || !password || !gender) {
      return messages.error(400, "All fields are required");
    }

    if (await User.findOne({ where: { email } })) {
      return messages.error(400, "email already exists");
    }
    let user;
    await sequelize.transaction(async (t) => {
      const hashedPassword = await utils.hashedPassword(password);
      user = await User.create({
        name,
        email,
        gender,
        password: hashedPassword,
      }, { transaction: t });
    })
    return messages.success("Registration successfully", user);
  } catch (error) {
    console.log(error)
    return messages.error(500, error.message);
  }
}

module.exports = register