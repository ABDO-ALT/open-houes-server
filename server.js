const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const secret = require("./secret");
app.use(cors());


app.use(bodyParser.json());
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "open-house",
  password: secret.dbPassword,
  port: 5432,
});

app.get("/", function (req, res) {
  res.send("hello Mouaz, said, Nandan");
});
app.get("/clients", (req, res) => {
  pool
    .query("SELECT * FROM clients")
    .then((result) => res.json(result.rows))
    .catch((err) => res.json(err, 404));
});
app.post("/", function (req, res) {
  res.send("Post request to the postman");
});
function createNewuser(pool, req) {
  const newFirstName = req.body.first_name;
  const newLast_name = req.body.last_name;
  const newEmail = req.body.email;
  const newCity = req.body.city;
  const newPhone_number = req.body.phone_number;
  const newAge = req.body.age;
  const newUser_type = req.body.user_type;
  const newGenber = req.body.gender;
  //first_name,last_name, email, city,phone_number,user_type,gender
  const query =
    "INSERT INTO clients(first_name,last_name, email, city,phone_number,age,user_type,gender) VALUES ($1, $2, $3, $4,$5, $6 ,$7,$8)";
  return pool.query(query, [
    newFirstName,
    newLast_name,
    newEmail,
    newCity,
    newPhone_number,
    newAge,
    newUser_type,
    newGenber,
  ]);
}

app.post("/clients", function (req, res) {
  createNewuser(pool, req)
    .then(() => {
      res.status(201).send("created");
    })
    .catch(() => {
      res.status(500).send("There was some");
    });
});

app.listen(5000, function () {
  console.log("Server is listening on port 5000. Ready to accept requests!");
});
