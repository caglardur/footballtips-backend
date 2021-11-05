const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const matchRouter = require("./router/match-router")
const HttpError = require("./models/http.error")

app = express()

app.use(cors())
app.use(express.json())

app.use("/api", matchRouter)

app.use((req, res, next) => {
  const error = new HttpError("wrong path", 404)
  throw error
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || "unknown error" })
})

mongoose
  .connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5090))
  .then(() => console.log("server start 5090"))
  .catch(err => console.log(err))
