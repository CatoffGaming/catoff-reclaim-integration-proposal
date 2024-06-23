const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')
require('dotenv').config()

exports.processLichessData = async (proof, providerName) => {
  const lichessUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.username
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  console.log(`Lichess username: ${lichessUsername}`)
  const userData = await getUserData(lichessUsername)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    lichessUsername,
    userData,
    proof[0]
  )
}

const getUserData = async username => {
  const url = `https://lichess.org/api/user/${username}`

  const data = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.LICHESS_API_KEY}`,
    },
  })
  const response = data

  console.log(`Current data of ${username} is given below:`)
  console.dir(response.data, { depth: null })
  return response
}