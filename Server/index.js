const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "phoklang_school",
  host: "localhost",
  password: "TVqE8McrRX",
  database: "phoklang_school",
  // post: "2121",
});

app.get('/', (req, res) => {
  res.send('text rest');
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM login_user", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/create", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const status = req.body.status;
//   const position = req.body.position;
//   const wage = req.body.wage;

  db.query(
    "INSERT INTO login_user (email, password, status) VALUES (?,?,?)",
    [email,password,status],
    (err, result) => {
      if (err,result) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  db.query(
    "UPDATE login_user SET password = ? WHERE id = ?",
    [password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM login_user WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3000, () => {
    console.log("Yey, your server is running on port 3001");
});