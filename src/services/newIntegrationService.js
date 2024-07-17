const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processNewIntegrationData = async (proof, providerName) => {
  // Extract relevant data from the proof
  const newData = JSON.parse(proof[0].claimData.context).extractedParameters.newParameter

  // Process the extracted data
  const newValue = newData.match(/value=\\"([\d,]+)/)[1].replace(/,/g, '')

  // Extract additional relevant data from the proof
  const url = JSON.parse(proof[0].claimData.parameters).url
  const matchurl = url.match(/user\/([^\/]+)/)
  const username = matchurl ? matchurl[1] : null
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  // Create a ReclaimServiceResponse object with the processed data
  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, parseInt(newValue, 10), proof[0])
}
