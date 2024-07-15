const express = require("express");
// organize and manage routes in a modular and efficient manner
const questionRouter = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const {
  question,
  selectquestion,
  selectsinglequestion,
  selectansawer,
} = require("../Controller/questionController");
questionRouter.post("/askquestion", question);
questionRouter.get("/getquestions", selectquestion);
questionRouter.get("/selectsinglequestion", selectsinglequestion);
questionRouter.get("/selectansawer", selectansawer);

module.exports = questionRouter;

// const express = require("express");
// const Router = express.Router();
// const authMiddleware = require("../Middleware/authMiddleware");

// Router.get("/all-questions",authMiddleware,(req,res)=>{res.send("all questions")})
