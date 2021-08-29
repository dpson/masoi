const mysql = require('mysql')
const db = mysql.createConnection({
	host: "sql6.freemysqlhosting.net",
	user: "sql6433451",
	password: "tFSg9kuRgL",
	database:"sql6433451" 
})

module.exports = db;