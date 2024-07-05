const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processMonkeyTypeData = async (proof, providerName) => {
  // Extract relevant data from the proof
  const wpm = JSON.parse(proof[0].claimData.context).extractedParameters.wpm15s
  const acc = JSON.parse(proof[0].claimData.context).extractedParameters.acc
  const completionTime = JSON.parse(proof[0].claimData.context)
    .extractedParameters.completionTime
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .username

  const date = new Date(Number(completionTime))
  // Options for formatting timestamp
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }

  // Format the date and time
  const formattedDate = date.toLocaleString('en-US', options)
  const ProcessedData = {
    wpm,
    acc,
    formattedDate,
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
