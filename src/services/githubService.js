const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processGitHubData = async (proof, providerName) => {
  console.log("go for it : ",providerName)
  const githubUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userName
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const commitCount = await getUserCommits(githubUsername)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    githubUsername,
    commitCount,
    proof[0]
  )
}

const getUserCommits = async username => {
  const daysAgo = 3650 // Approx. 10 years
  const dateSince = new Date(new Date().setDate(new Date().getDate() - daysAgo))
    .toISOString()
    .split('T')[0]
  console.log("user name : ",username)
  const url = `https://api.github.com/search/commits?q=author:${username}+committer-date:>${dateSince}`
  const githubToken = process.env.RECLAIM_GITHUB_TOKEN

  const response = await axios.get(url, {
    headers: {
      Accept: 'application/vnd.github.cloak-preview',
      Authorization: `token ${githubToken}`,
    },
  })

  console.log(
    `Total commits by ${username} in the last 10 years: ${response.data.total_count}`
  )
  return response.data.total_count
}





// // Package import
// import { Reclaim } from '@reclaimprotocol/js-sdk';
  
// const getVerificationReq = async () => {
//       const reclaimClient = new Reclaim.ProofRequest("0x449c4A598810232e36e56579eBB8e28DFb98C47B" );
//       const providerIds = [
//         'bc3ebc42-0726-4ac8-9d6b-c4cde5cfa145', // Tyretp
//       ];
//       const APP_SECRET ="0x80758e792730a0993e3271ccc81b17c1d40a309079165e86ec5713f71e9a2dea"  // your app secret key.
      
//       await reclaimClient.buildProofRequest(providerIds[0])
//       reclaimClient.setSignature(
//           await reclaimClient.generateSignature(
//             APP_SECRET
//         )
//       )
//       const {reclaimUrl, statusUrl} = await reclaimClient.createVerificationRequest()
//       return {reclaimUrl, statusUrl}
//   }
