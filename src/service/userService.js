import bcrypt from 'bcryptjs';
import mysql from 'mysql2';

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node_react"
});
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);


const hashPassword = (password) => {
    var pass_hash = bcrypt.hashSync(password, salt);
    return pass_hash
}

const CreateNewUser = (username, password, email) => {
    const pass_hash = hashPassword(password);
    const sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    const values = [username, pass_hash, email];
    con.query(sql,values, function (err, result) {
          if (err) throw err;
          console.log("Table altered");
    });
}

module.exports = {
    CreateNewUser,
    hashPassword
}