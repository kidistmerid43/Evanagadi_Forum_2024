const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
	user: process.env.USER,
	database: process.env.DATABASE,
	host: "roundhouse.proxy.rlwy.net",
	password: process.env.PASSWORD,
	connectionLimit: 10,
	port: 45149,
});


// dbconnection.execute("select 'test'", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });
module.exports = dbconnection.promise();
