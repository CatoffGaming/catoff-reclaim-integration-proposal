const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processUberData = async (proof, providerName) => {
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
  const url = `https://riders.uber.com/trips-legacy?page=1`
  const ubertoken = process.env.RECLAIM_UBER_TOKEN

  const response = await axios.get(url, {
    headers: {
      Accept: 'application/vnd.github.cloak-preview',
      Authorization: `token ${ubertoken}`,
    },
  })

  console.log(
    `Total rides by ${username} in the last 10 years: ${response.data.getTrips.count}`
  )
  return response.data.getTrips.count
}
