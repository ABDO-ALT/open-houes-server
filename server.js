const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const secret = require("./secret");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());

app.use(bodyParser.json());
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "open_house",
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
  const newcountry = req.body.country;
  const newPhone_number = req.body.phone_number;
  const newAge = req.body.age;
  const newUser_type = req.body.user_type;
  const newGenber = req.body.gender;
  let newPassword = req.body.password;

  return bcrypt.hash(newPassword, saltRounds).then(function (hash) {
    const query =
      "INSERT INTO clients(first_name,last_name, email, country,phone_number,age,user_type,gender,password) VALUES ($1, $2, $3, $4,$5, $6 ,$7,$8,$9)";
    return pool.query(query, [
      newFirstName,
      newLast_name,
      newEmail,
      newcountry,
      newPhone_number,
      newAge,
      newUser_type,
      newGenber,
      hash,
    ]);
  });
}
//first_name,last_name, email, country,phone_number,user_type,gender

//Mew route
app.post("/clients", function (req, res) {
  createNewuser(pool, req)
    .then(() => {
      console.log(req.body);
      const userData = {
        first_name: req.body.first_name,
        user_type: req.body.user_type,
      };
      res.json(userData).status(200);
      //res.status(201).send("created");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Your email or phone number already exists");
    });
});

app.post("/login", function (req, res) {
  //get email and password from request body
  const Email = req.body.email;
  const Password = req.body.password;

  //get old hash password from database
  pool
    .query(
      `SELECT password, id, user_type ,first_name FROM clients where email = '${Email}'`
    )

    // compare old hash password with new password
    .then((result) => {
      if (result.rows.length == 0) {
        res.status(404).send(" your email doesn't exists");
      } else {
        const user = result.rows[0];

        console.log("user logging in: ", user);
        bcrypt
          .compare(Password, user.password)
          .then(function (result) {
            console.log("first", result);
            if (result) {
              // WHAT IF I SEND THE USER DATA TO THE CLIENT??
              // (including id, name, etc.)
              // send `user` as json!!
              // (could take out password)
              const userData = {
                id: user.id,
                first_name: user.first_name,
                user_type: user.user_type,
              };

              // send (as JSON) userData to client.
              console.log(userData);

              res.json(userData).status(200);
            } else {
              // console.log("😢");
              res.status(401).send(" Your password It's Not Match");
            }
          })
          .catch(function (error) {
            res.status(500).send(error, "Refresh your page");
          });
      }
    });
});
app.post("/rooms", function (req, res) {
  // console.log('aaaareq',req);
  // console.log("aaaares", res);

  // clientsId
  const ClientsId = req.body.clients_id;
  const StartDate = req.body.start_date;
  const EndDate = req.body.end_date;
  const City = req.body.city;
  const query =
    "INSERT INTO rooms(clients_id,start_date, end_date,city) VALUES ($1, $2, $3,$4)";
  console.log(pool.query);
  pool
    .query(query, [ClientsId, StartDate, EndDate, City])
    .then((result) => {
      console.log("created", result);
    })
    .catch((error) => {
      console.log(error);
    });
});


function getRooms(req, res) {

  pool
    .query(
      "SELECT * FROM clients c2  INNER JOIN rooms  ON c2.id = rooms.clients_id ;"
    )
    .then((result) => {
      console.log(result);
      res.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
}

//function getRoomsForUser(req, res) {

//}

app.get("/rooms", function (req, res) {
  
  // ADD query params
  // host will make query for only his rooms:   /rooms?userId=foobar
  // OR
  // guests will make query:   /rooms

  // IF query param userId exists
  // call getRoomsForuser(req, res)

  // ELSE
  // call getRooms(req, res)
  
  getRooms(req, res)
});

app.listen(5000, function () {
  console.log("Server is listening on port 5000. Ready to accept requests!");
});
