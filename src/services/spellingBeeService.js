const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processSpellingBeeData = async (proof, providerName) => {
  const userStatsExtracted = JSON.parse(
    proof[0].claimData.context
  ).extractedParameters

  const userStats = {
    longestWord: userStatsExtracted.longest_word,
    puzzlesStarted: userStatsExtracted.puzzles_started,
    totalPangrams: userStatsExtracted.total_pangrams,
    totalWords: userStatsExtracted.total_words,
  }

  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  // Spelling bee does not provider username
  const username = userStatsExtracted.user_id

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    userStats,
    proof[0]
  )
}
