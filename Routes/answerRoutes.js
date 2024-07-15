const express = require("express");
const answerRouter = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const { answerQuestion, getAnswer } = require("../Controller/answerController");
answerRouter.post("/answerQuestion", answerQuestion);
answerRouter.get("/getanswer", getAnswer);

module.exports = answerRouter;
