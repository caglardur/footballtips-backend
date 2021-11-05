const express = require("express")

const matchController = require("../controller/match-controller")

const router = express.Router()

router.get("/singleMatch/:matchId", matchController.getSingleMatch)
router.get("/matchesByDate/:date", matchController.getMatchesByDate)
router.get("/matchesByTeams/:homeTeamId/:awayTeamId", matchController.getMatchesByTeams)

module.exports = router
