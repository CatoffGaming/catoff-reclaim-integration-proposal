const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processWordleData = async (proof, providerName) => {
  const userStatsExtracted = JSON.parse(
    proof[0].claimData.context
  ).extractedParameters

  const userStats = {
    gamesPlayed: userStatsExtracted.gamesPlayed,
    currentStreak: userStatsExtracted.currentStreak,
    gamesWon: userStatsExtracted.gamesWon,
    maxStreak: userStatsExtracted.maxStreak,
  }

  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  // Wordle does not provider username
  const username = null

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    userStats,
    proof[0]
  )
}
