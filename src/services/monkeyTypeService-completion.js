const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processMonkeyTypeCompletionData = async (proof, providerName) => {
  // Extract relevant data from the proof
  const completedTests = JSON.parse(proof[0].claimData.context)
    .extractedParameters.completedTests //Total completed test of the user
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .username //user name of the proof
  // The complete processedData from monkeyType
  const ProcessedData = {
    providerName,
    completedTests,
    username,
  }
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  // Create a ReclaimServiceResponse object with the processed data
  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    ProcessedData,
    proof[0]
  )
}
