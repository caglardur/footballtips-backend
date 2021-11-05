const HttpError = require("../models/http.error")
const Match = require("../models/match")

const getSingleMatch = async (req, res, next) => {
  const { matchId } = req.params

  let singleMatch

  try {
    singleMatch = await Match.findOne({ "fixture.id": matchId })
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500)
    return next(error)
  }

  if (!singleMatch || singleMatch.length == 0) {
    const error = new HttpError("Match not found", 404)
    return next(error)
  }

  res.json({ singleMatch })
}

exports.getSingleMatch = getSingleMatch
