const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processMonkeyTypeData = async (proof, providerName) => {
  // Extract relevant data from the proof
  const wpm = JSON.parse(proof[0].claimData.context).extractedParameters.wpm // word per minutes speed of the test
  const acc = JSON.parse(proof[0].claimData.context).extractedParameters.acc // accuracy for the test
  const timeStamp = JSON.parse(proof[0].claimData.context)
    .extractedParameters.completionTime // completion time of the test
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .username //username of the proof

  const date = new Date(Number(timeStamp))
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
  const completionTime = date.toLocaleString('en-US', options)
  // The complete processedData from monkeyType
  const ProcessedData = { 
    providerName,
    wpm,
    acc,
    completionTime,
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
