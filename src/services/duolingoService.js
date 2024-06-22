// axios is not used because response could not be fetched by axios get method but by cURL.
// uncomment the lines below and comment line 4, 15, 18, 27 to use Axios.

// const axios = require('axios')
const { execSync } = require('child_process')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processDuolingoStreak = async (proof, providerName) => {
  try {
    const duolingoUserId = JSON.parse(proof[0].claimData.context)
      .extractedParameters.userId

    const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

    const duolingoUrl = `https://www.duolingo.com/2023-06-19/users/${duolingoUserId}`
    const curlCommand = `curl -s ${duolingoUrl}`
    // const response = await axios.get(duolingoUrl)

    const curlOutput = execSync(curlCommand, { encoding: 'utf-8' })

    // if (response.status !== 200) {
    //   throw new Error(
    //     `Failed to fetch data from Duolingo for userId: ${duolingoUserId}`
    //   )
    // }

    // const userData = response.data
    const userData = JSON.parse(curlOutput)

    const username = userData?.username || 'Unknown'
    const currentStreakLength = userData?.streak || 0

    console.log(
      `User ${username} has a current streak of ${currentStreakLength} days.`
    )

    return new ReclaimServiceResponse(
      providerName,
      lastUpdateTimeStamp,
      username,
      { streak: currentStreakLength },
      proof[0]
    )
  } catch (error) {
    console.log('Error processing Duolingo streak data', error)
    throw error
  }
}
