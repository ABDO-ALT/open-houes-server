const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const secret = require("./secret");
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "open-house",
  password: secret.dbPassword,
  port: 5432,
});
app.get("/", function(req, res) {
  res.send("hello Mouaz, said, Nandan" );
});
app.get("/clients", (req, res) => {
  pool
    .query("SELECT * FROM clients")
    .then(result => res.json(result.rows))
    .catch(err => res.json(err, 404));
});


app.listen(5000, function () {
  console.log("Server is listening on port 5000. Ready to accept requests!");
});
