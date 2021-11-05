const express = require("express")

const matchController = require("../controller/match-controller")

const router = express.Router()

router.get("/singleMatch/:matchId", matchController.getSingleMatch)

module.exports = router
