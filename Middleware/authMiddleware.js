const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "No token provided/Authentication: Invalid" });
	}

	const token = authHeader.split(" ")[1];
	try {
		const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { username, userid };
		//  return res
		// 		.status(StatusCodes.OK)
		// 		.json({ data });

		next();
	} catch (error) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "Authentication: Invalid" });
	}
}
module.exports = authMiddleware;
