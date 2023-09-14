const express = require("express");
const app = express();
const cors = require("cors");
const pg = require("pg"); // Import the pg package
const PORT = 5001;
require("dotenv").config()

//Connect to database
const conString = process.env.CONNECTION_STRING; // Replace with your PostgreSQL URL
const client = new pg.Client(conString);

// Connect to the PostgreSQL server
client.connect(function(err) {
  if (err) {
    console.error("could not connect to postgres", err);
  } else {
    console.log("Connected to PostgreSQL");
  }
});
app.use(cors())


//get all items
app.get("/items", async (req, res) => {
  try {
    client.query("SELECT * FROM store", (err, result) => {
      if (err) {
        console.error("error running query", err);
        res.status(500).send("Server Error");
      } else {
        const rows = result.rows
        console.log("Retrieved data from database:", rows);
    
        res.json(result.rows)
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

