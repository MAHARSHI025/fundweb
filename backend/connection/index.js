const mysql = require("mysql");
const dotenv = require('dotenv');
 
dotenv.config();
 
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});
 
const connectDB = async () => {
  connection.getConnection((err, connection) => {
    if (err) {
      
      console.log(process.env);
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);
    connection.release();
  });
}
 
module.exports = { connection, connectDB };