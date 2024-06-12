const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processLeetcodeData = async (proof, providerName) => {
  const leetcodeUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userName
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const solvedCount = await getUserSolved(leetcodeUsername)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    leetcodeUsername,
    solvedCount,
    proof[0]
  )
}

const getUserSolved = async username => {
  const url = `https://leetcode-api.p.rapidapi.com/user/${username}/solved`

  const response = await axios.get(url, {
    headers: {
      'x-rapidapi-key': `${process.env.X_API_KEY}`,
      'x-rapidapi-host': 'leetcode-api.p.rapidapi.com',
    },
  })
  console.log(response)
  return response
}
