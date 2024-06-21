const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')
const axios = require('axios')

exports.processStravaIntegrationData = async (proof, providerName) => {
  const stravaToken = JSON.parse(proof[0].claimData.context).extractedParameters
    .stravaToken
  const url = `https://www.strava.com/api/v3/athlete/activities`

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${stravaToken}`,
    },
  })

  const activities = response.data.map(activity => ({
    name: activity.name,
    distance: activity.distance,
    moving_time: activity.moving_time,
  }))
  const lastUpdateTimeStamp = new Date().toISOString()

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    proof[0].claimData.parameters.userId,
    activities,
    proof[0]
  )
}
