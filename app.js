require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;
const cors = require("cors");
app.use(cors());
const dbconnection = require("./db/dbConfig");
//user routes middleware file


const userRoutes = require("./Routes/userRoutes");
const askqueastionroutes = require("./Routes/questionRoutes");
const answerquestions = require("./Routes/answerRoutes");
const authMiddleware = require("./Middleware/authMiddleware");
const dbConfig = require("./db/dbConfig");

app.use(express.json()); // any request pass througn this JSON middleware

app.get('/create-table', (req, res)=>{
  const userTable = `CREATE TABLE users(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(userid)
);`;
const answersTable = `CREATE TABLE answers(
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answerid),
    FOREIGN KEY(questionid) REFERENCES questions(questionid),
    FOREIGN KEY(userid) REFERENCES users(userid)
);`;
const questionTable = `CREATE TABLE questions(
   id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    PRIMARY KEY(id, questionid),
    FOREIGN key(userid) REFERENCES users(userid)
);`;

(async () => {
	// await dbConfig.query(userTable);
	// await dbConfig.query(questionTable);
	await dbConfig.query(answersTable);
})();

res.send("Table created succesfully")
})

app.use("/api/users", userRoutes); //user route middleware
app.use("/api/question",authMiddleware, askqueastionroutes); //question route middleware
app.use("/api/answer", answerquestions); //answer route middleware
//
//
//
//
//
async function start() {
  try {
    const result = await dbconnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listneing on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
// app.listen(port, (err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(`listneing port ${port}`);
//   }
// });
