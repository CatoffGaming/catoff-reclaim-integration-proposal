const axios = require('axios')
const { Reclaim } = require('@reclaimprotocol/js-sdk')
const { RECLAIM_PROVIDER_ID, RECLAIM_APP_ID } = require('../utils/constants')
const { processTwitterData } = require('./twitterService')
const { processGitHubData } = require('./githubService')
const { processStravaIntegrationData } = require('./stravaIntegrationService')

exports.signWithProviderID = async (userId, providerId) => {
  const providerName = RECLAIM_PROVIDER_ID[providerId]
  const reclaimAppID = RECLAIM_APP_ID[providerName]
  const reclaimAppSecret = process.env[`${providerName}_SECRET`]

  console.log(
    `Sending signature request to Reclaim for userId: ${userId} with providerName: ${providerName}`
  )

  try {
    const reclaimClient = new Reclaim.ProofRequest(reclaimAppID)
    await reclaimClient.buildProofRequest(providerId)
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(reclaimAppSecret)
    )
    const { requestUrl: signedUrl } =
      await reclaimClient.createVerificationRequest()

    await handleReclaimSession(userId, reclaimClient, providerName)
    return signedUrl
  } catch (error) {
    console.error(
      `Failed to process Reclaim request for userId: ${userId}`,
      error
    )
    throw error
  }
}

const handleReclaimSession = async (userId, reclaimClient, providerName) => {
  await reclaimClient.startSession({
    onSuccessCallback: async proof => {
      console.log(
        `Successful reclaim callback with proof: ${JSON.stringify(proof)}`
      )

      try {
        let processedData
        switch (providerName) {
          case 'TWITTER_ANALYTICS_VIEWS':
            processedData = await processTwitterData(proof, providerName)
            break
          case 'GITHUB_ACCOUNT_VERIFICATION':
            processedData = await processGitHubData(proof, providerName)
            break
          case 'STRAVA_SERVICE':
            processedData = await processStravaIntegrationData(
              proof,
              providerName
            )
            break
          default:
            throw new Error(`No handler for provider: ${providerName}`)
        }

        console.log(`Processed data: ${JSON.stringify(processedData)}`)
      } catch (error) {
        console.error(
          `Failed to process Reclaim proof for userId: ${userId}`,
          error
        )
      }
    },
    onFailureCallback: error => {
      console.error(`Verification failed for userId: ${userId}`, error)
    },
  })
}
