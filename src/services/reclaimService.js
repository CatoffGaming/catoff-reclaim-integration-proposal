const axios = require('axios')
const { Reclaim } = require('@reclaimprotocol/js-sdk')
const { RECLAIM_PROVIDER_ID, RECLAIM_APP_ID } = require('../utils/constants')
const { processTwitterData } = require('./twitterService')
const { processGitHubData } = require('./githubService')
const { processLeetcodeData } = require('./LeetcodeMaxStreakService')

exports.signWithProviderID = async (userId, providerId) => {
  const providerName = RECLAIM_PROVIDER_ID[providerId]
  const reclaimAppID = RECLAIM_APP_ID[providerName]
  const reclaimAppSecret = process.env[`${providerName}_SECRET`]

  console.log(
    `Sending signature request to Reclaim for userId: ${userId} with providerName: ${providerName}`
  )

  try {         
    const reclaimClient = new Reclaim.ProofRequest('0x989AB80745743218D03F75C7A4E29F1E8151881a')
    await reclaimClient.buildProofRequest('ebc4927b-ebac-4969-99fa-46d2218be85b')
    reclaimClient.setSignature(
      await reclaimClient.generateSignature('0x2762a40f292443a5d512613ada961528f2c9a69dc20d146438c0827b66331016')
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
  console.log('Starting session')
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
          case 'LEETCODE_ACCOUNT_VERIFICATION':
            processedData = await processLeetcodeData(proof, providerName);
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
  console.log('Ended session')
}