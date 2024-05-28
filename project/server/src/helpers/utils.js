const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashedPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "24h" });
};

const decodeToken = (token) => {
	return jwt.verify(token, process.env.JWT_KEY);
};

const comparePasswords = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
	comparePasswords,
	generateToken,
	decodeToken,
	hashedPassword,
};
