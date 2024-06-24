const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processUberData = async (proof, providerName) => {
  console.log('here')
  const uberUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userName

  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)
  const rideCounts = await getrideCounts(uberUsername)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    uberUsername,
    parseInt(rideCounts, 10),
    proof[0]
  )
}

const getrideCounts = async username => {
  const url = ` https://api.uber.com/v1/partners/trips`
  const ubertoken = process.env.RECLAIM_UBER_TOKEN

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${ubertoken}`,
    },
  })

  console.log(
    `Total rides by ${username} in the last 10 years: ${response.data.getTrips.count}`
  )
  return response.data.count
}
