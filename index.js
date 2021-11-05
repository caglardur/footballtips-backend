const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

app.use = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect()
  .then()
  .catch(err => console.log(err))
