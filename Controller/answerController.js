const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function answerQuestion(req, res) {
  const { user_id, question_id, answer } = req.body;
  try {
    await dbconnection.query(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [question_id, user_id, answer]
    );
    res
      .status(StatusCodes.CREATED)
      .json({ message: "The answer has been posted successfully." });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong. Please try again later." });
  }
}
async function getAnswer(req, res) {
	const { questionId } = req.query;
  console.log(questionId)
	try {
		const query = `
      SELECT users.username, answers.answer
      FROM users 
      JOIN answers ON users.userid = answers.userid AND answers.questionid =? `;
		const [rows] = await dbconnection.query(query, [questionId]);
    console.log(rows)
		if (rows.length == 0) {
			return res
				.status(StatusCodes.OK)
				.json({ msg: "Answer not found", Allanswers:[] });
		}
		const Allanswers = rows.map((row) => ({
			username: row.username,
			answer: row.answer,
		}));
		return res.status(StatusCodes.OK).json({ Allanswers });
	} catch (error) {
		// console.error("Error executing SQL query:", error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong. Please try again later." });
	}
}
module.exports = { answerQuestion, getAnswer };
