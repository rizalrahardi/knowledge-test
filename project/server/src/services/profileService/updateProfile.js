const { User, sequelize } = require("../../database/models");
const { messages } = require("../../helpers")

const updateProfile = async (account, data) => {
  try {
    const userId = account.id
    const { name, email, gender } = data
    if (await User.findOne({ where: { email } })) {
      return messages.error(400, "email already exists");
    }

    await sequelize.transaction(async (t) => {
      await User.update({
        name,
        email,
        gender
      }, { where: { id: userId } }, { transaction: t });
    })
    return messages.success("Profile updated successfully");

  } catch (error) {
    console.log(error)
    return messages.error(500, error.message);
  }
}

module.exports = updateProfile