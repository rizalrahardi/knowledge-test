const { messages } = require('../helpers')
const { profileService } = require('../services')

const getProfile = async (req, res) => {
  try {
    const account = req.account
    const result = await profileService.getProfile(account)
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ message: error.message })
  }
}

const updateProfile = async (req, res) => {
  try {
    const account = req.account
    const data = req.body
    const result = await profileService.updateProfile(account, data)
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(error.status).json({ message: error.message })
  }
}

module.exports = {
  getProfile,
  updateProfile
}