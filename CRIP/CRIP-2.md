| proposal | title                 | description                                                  | author                                     | discussions-to | status | type        | category | created    | requires |
| -------- | --------------------- | ------------------------------------------------------------ | ------------------------------------------ | -------------- | ------ | ----------- | -------- | ---------- | -------- |
| CRIP-2   | Etherscan Integration | Integration with Etherscan API to validate user transactions | Rashid Mazhar <rashidmazhar0507@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-21 |          |

## Title

Etherscan Integration

## Introduction

This proposal outlines the integration of Etherscan as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user activity data from Etherscan, such as the total number of transactions by an Ethereum address, to be used within the Catoff platform. This will enable users to validate their Ethereum blockchain activities and use them for various challenges and verifications on Catoff.

## External APIs Needed

- ETHERSCAN API: https://api.etherscan.io/api?module=account&action=txlist&address=<your-wallet-address>&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=<your-api-key>

## Use Cases

1. **User Verification**: Verify the activity of users on Etherscan and get the stats such as the total number of transactions made by their Ethereum address.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of Ethereum transaction activity.
3. **Skill Assessment**: Assess users' engagement and activity on the Ethereum blockchain using transaction metrics.

## Data Provider

- **Name**: EtherscanTransactions
- **Hash Value**: 0x92050996725b6708f8f2a89769dc494acffffde62fb7001a04fa47fe00e522a6

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Etherscan integration. The full implementation should follow the service file template.

## API REQUEST TEMPLATE (http://localhost:3000/reclaim/sign)

- **userId**: 'enter your wallet address'
- **tag** : etherscan

**`services/etherscanService.js`**

```javascript
const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processCodeforcesData = async (proof, providerName) => {
  const codeforcesUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userName
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const rating = await getUserRating(codeforcesUsername)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    codeforcesUsername,
    rating,
    proof[0]
  )
}

const getUserRating = async codeforcesUsername => {
  const url = `https://codeforces.com/api/user.rating?handle=${codeforcesUsername}`

  const data = await axios.get(url)
  const response = data.result[result.length - 1].newRating

  console.log(`Current rating of ${codeforcesUserName} is ${response}`)
  return response
}
```
