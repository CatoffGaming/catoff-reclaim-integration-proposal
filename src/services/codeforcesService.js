const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processCodeforcesData = async (proof, providerName) => {
  const codeforcesUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userName
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const rating = await getUserRating(codeforcesUsername)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    codeforcesUsername,
    rating,
    proof[0]
  )
}

const getUserRating = async codeforcesUsername => {
  const url = `https://codeforces.com/api/user.rating?handle=${codeforcesUsername}`

  const data = await axios.get(url)
  const response = data.result[result.length - 1].newRating

  console.log(`Current rating of ${codeforcesUserName} is ${response}`)
  return response
}
