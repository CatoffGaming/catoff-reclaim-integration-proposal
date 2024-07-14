const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processhuggingData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(
    proof[0].claimData.context
  ).extractedParameters

  const username = extractedParameters.username

  console.log(`Hugging Face user: ${username}`)

  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    username,
    proof[0]
  )
}
