const { messages } = require("../helpers")
const { authService } = require("../services");

const register = async (req, res) => {
  try {
    const data = req.body;
    const result = await authService.register(data);
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ message: error.message })
  }
}

module.exports = { register, login }