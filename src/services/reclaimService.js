const axios = require('axios')
const { Reclaim } = require('@reclaimprotocol/js-sdk')
const { RECLAIM_PROVIDER_ID, RECLAIM_APP_ID } = require('../utils/constants')
const { processTwitterData } = require('./twitterService')
const { processGitHubData } = require('./githubService')
require('dotenv').config();

exports.signWithProviderID = async (userId, providerId) => {
  console.log("boo : ",userId,providerId);
  console.log("RECLAIM_PROVIDER_ID edfe : ",RECLAIM_PROVIDER_ID[providerId])
  const providerName = RECLAIM_PROVIDER_ID[providerId]
  console.log("Provider name : " ,providerName)
  const reclaimAppID = RECLAIM_APP_ID[providerName]
  console.log("reclaimAppID : " ,reclaimAppID)
  //const hj=`${providerName}_SECRET`;
  const reclaimAppSecret = process.env[`${providerName}_SECRET`]
  console.log("reclaimAppSecret : " ,reclaimAppSecret)

  console.log(
    `Sending signature request to Reclaim for userId: ${userId} with providerName: ${providerName}`
  )

  try {
    const reclaimClient = new Reclaim.ProofRequest(reclaimAppID)
    console.log(reclaimClient)
    await reclaimClient.buildProofRequest(providerId)
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(reclaimAppSecret)
    )

    const { requestUrl: signedUrl } =
      await reclaimClient.createVerificationRequest()
      console.log("hhhbb :",{ requestUrl: signedUrl })

    await handleReclaimSession(userId, reclaimClient, providerName)
    

    console.log("ended");
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
      console.log("two")
      console.log(
        `Successful reclaim callback with proof: ${JSON.stringify(proof)}`
      )
      console.log("aa : ",proof);

      try {
        let processedData
        console.log("two");
        switch (providerName) {
          case 'TWITTER_ANALYTICS_VIEWS':
            processedData = await processTwitterData(proof, providerName)
            break
          case 'GITHUB_ACCOUNT':
            console.log("fourth")
            processedData = await processGitHubData(proof, providerName)

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
  //console.log("hgvnbm : ",t )
}


 console.log("ended");


// // Package import
// import { Reclaim } from '@reclaimprotocol/js-sdk';
  
// const getVerificationReq = async () => {
//       const reclaimClient = new Reclaim.ProofRequest("0x695FC75718ed80E17c4A72660314483Decf393B2" );
//       const providerIds = [
//         '7369ce2a-5e2f-436d-9df7-918197d26b81', // github name1
//       ];
//       const APP_SECRET ="0x29f88462113efb62bd5e1079bea7ea0eb2684e38bcda505cb1e4438adf606b09"  // your app secret key.
      
//       await reclaimClient.buildProofRequest(providerIds[0])
//       reclaimClient.setSignature(
//           await reclaimClient.generateSignature(
//             APP_SECRET
//         )
//       )
//       const {reclaimUrl, statusUrl} = await reclaimClient.createVerificationRequest()
//       return {reclaimUrl, statusUrl}
//   }
