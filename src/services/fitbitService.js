const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processFitbitStepsData = async (proof, providerName) => {
  const fitbitUserId = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userId
  const lastUpdateTimeStamp = proof[0].claimData.timestampS
  const accessToken = JSON.parse(proof[0].claimData.context).extractedParameters
    .accessToken
  const stepCount = await getUserSteps(fitbitUserId, accessToken)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    fitbitUserId,
    stepCount,
    proof[0]
  )
}

/// Get the total steps for a user on the current day
const getUserSteps = async (userId, accessToken) => {
  const today = new Date().toISOString().split('T')[0]
  const url = `https://api.fitbit.com/1/user/${userId}/activities/steps/date/today/1d.json`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const stepData = response.data['activities-steps'][0]
    console.log(`Total steps for ${userId} on ${today}: ${stepData.value}`)
    return parseInt(stepData.value, 10)
  } catch (error) {
    console.error('Error fetching Fitbit step data:', error.message)
    throw error
  }
}
