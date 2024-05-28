const { User } = require("../../database/models");
const { messages } = require("../../helpers");

const getProfile = async (account) => {
  try {
    const userId = account.id
    const user = await User.findOne({ where: { id: userId } });
    return messages.success("Profile fetched successfully", user);
  } catch (error) {
    console.log(error)
    return messages.error(500, error.message);
  }
}

module.exports = getProfile