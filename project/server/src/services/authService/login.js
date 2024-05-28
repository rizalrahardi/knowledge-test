const { User } = require("../../database/models");
const { messages, utils } = require("../../helpers");

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return messages.error(404, "User not found");
    }
    const compared = await utils.comparePasswords(password, user.password);
    if (!compared) {
      return messages.error(404, "Wrong password");
    }
    const token = utils.generateToken(user.id);
    return messages.success("Login successfully", { user, token });
  } catch (error) {
    console.log(error)
    return messages.error(500, error.messages)
  }
}

module.exports = login