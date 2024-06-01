const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processNewIntegrationData = async (proof, providerName) => {
  // TODO: Extract relevant data from the proof
  // Replace 'newParameter' with the actual parameter you need to extract
  const newData = JSON.parse(proof[0].claimData.context).extractedParameters.newParameter

  // TODO: Process the extracted data
  // Adjust the extraction logic based on the actual format of the data
  // For example, if the data is a string with numeric value
  const newValue = newData.match(/value=\\"([\d,]+)/)[1].replace(/,/g, '')

  // TODO: Extract additional relevant data from the proof
  const url = JSON.parse(proof[0].claimData.parameters).url
  const matchurl = url.match(/user\/([^\/]+)/)
  const username = matchurl ? matchurl[1] : null
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  // TODO: Create a ReclaimServiceResponse object with the processed data
  // Adjust the parameters and processing logic based on the actual data structure
  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, parseInt(newValue, 10), proof[0])
}
