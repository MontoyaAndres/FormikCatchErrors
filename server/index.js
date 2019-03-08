const express = require("express");
const cors = require("cors");

const app = express();

app
  .use(cors("*"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .post("/", (req, res) => {
    const { name, lastname } = req.body;

    if (name === "Andrés") {
      res.send([
        {
          path: "name",
          message: "You can't do it!"
        }
      ]);
      return;
    }

    if (lastname === "Montoya") {
      res.send([
        {
          path: "lastname",
          message: "You can't do it!"
        }
      ]);
      return;
    }

    res.send(null);
  })
  .listen(3000);
