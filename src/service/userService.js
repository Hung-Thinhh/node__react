import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

// get the promise implementation, we will use bluebird
const bluebird = require("bluebird");
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);

const hashPassword = (password) => {
  var pass_hash = bcrypt.hashSync(password, salt);
  return pass_hash;
};

const CreateNewUser = async (username, password, email) => {
  const pass_hash = hashPassword(password);

  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "node_react",
    Promise: bluebird,
  });
  // query database
  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, pass_hash, email]
    );
    return rows;
  } catch (error) {
    console.log("---- Error: " + error);
  }
};
const EditUser = async (username, email, id) => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "node_react",
    Promise: bluebird,
  });
  // query database
  try {
    const [rows, fields] = await connection.execute(
      "UPDATE users SET username = ?, email = ? WHERE id = ?",
      [username, email, id]
    );
    return rows;
  } catch (error) {
    console.log("---- Error: " + error);
  }
};
const GetUser = async () => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "node_react",
    Promise: bluebird,
  });
  // query database
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.log("---- Error: " + error);
  }
};
const GetUserbyID = async (id) => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "node_react",
    Promise: bluebird,
  });
  // query database
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log("---- Error: " + error);
  }
};
const DelUser = async (id) => {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "node_react",
    Promise: bluebird,
  });
  // query database
  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.log("---- Error: " + error);
  }
};

module.exports = {
  CreateNewUser,
  hashPassword,
  GetUser,
  DelUser,
  GetUserbyID,
  EditUser,
};
