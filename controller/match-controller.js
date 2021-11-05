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

const getMatchesByDate = async (req, res, next) => {
  const dateStart = new Date(req.params.date)
  const dateEnd = new Date(dateStart)
  dateEnd.setDate(dateEnd.getDate() + 1)

  let matches
  try {
    matches = await Match.find({ $and: [{ "fixture.date": { $gte: dateStart } }, { "fixture.date": { $lt: dateEnd } }] })
  } catch (err) {
    const error = new HttpError("Something went wrong, please try again", 500)
    return next(error)
  }
  if (!matches || matches.length == 0) {
    const error = new HttpError("Matches not found", 404)
    return next(error)
  }

  res.json({ matches })
}

exports.getSingleMatch = getSingleMatch
exports.getMatchesByDate = getMatchesByDate
