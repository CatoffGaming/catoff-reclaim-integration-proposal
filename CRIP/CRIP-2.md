| proposal | title            | description                                      | author                                     | discussions-to | status | type        | category | created    | requires |
| -------- | ---------------- | ------------------------------------------------ | ------------------------------------------ | -------------- | ------ | ----------- | -------- | ---------- | -------- |
| CRIP-2   | Uber Integration | Integration with Uber API to validate uber rides | Rashid Mazhar <rashidmazhar0507@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-01 |          |

## Title

Uber Integration

## Introduction

This proposal outlines the integration of Uber as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user activity data from Uber, such as total ride counts and daily rided counts to be used within the Catoff platform. This will enable users to validate their Uber rides and use them for various challenges and verifications on Catoff.

## External APIs Needed

- Uber API: https://api.uber.com/v1/partners/trips

## Use Cases

1. **User Verification**: Verify the activity of users on Uber by checking their ride counts.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of Uber activity.

## Data Provider

- **Name**: Uber username - Fix
- **Hash Value**: 0xebae1aa69594afc87e0eda36e7f1e8d6ec3d3e18bce494f3b154cb0b223b35e1

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Uber integration. The full implementation should follow the service file template.

**`services/githubService.js`**

```javascript
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
```
