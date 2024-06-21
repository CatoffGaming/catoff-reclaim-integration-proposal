| proposal | title                  | description                                             | author                                     | discussions-to | status | type        | category | created    | requires |
| -------- | ---------------------- | ------------------------------------------------------- | ------------------------------------------ | -------------- | ------ | ----------- | -------- | ---------- | -------- |
| CRIP-6   | Codeforces Integration | Integration with Codeforces API to validate user rating | Rashid Mazhar <rashidmazhar0507@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-01 |          |

## Title

Codeforces Integration

## Introduction

This proposal outlines the integration of Codeforces as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user activity data from Codeforces, such as user ratings and contest participation counts, to be used within the Catoff platform. This will enable users to validate their Codeforces contributions and use them for various challenges and verifications on Catoff.

## External APIs Needed

- CODEFORCES API: https://codeforces.com/api/user.rating?handle=<username>

## Use Cases

1. **User Verification**: Verify the activity of users on codeforces and get the stats such as contest count and contest ratings.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of Codeforces ratings.
3. **Skill Assessment**: Assess users' coding skills and problem solving ability using rating metrics and contest participations.

## Data Provider

- **Name**: CFRating
- **Hash Value**: 0x99ec1be56026967afe1622990bc222236cccdac4c3d8406c7915cd729a58d709

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Codeforces integration. The full implementation should follow the service file template.

## API REQUEST TEMPLATE (http://localhost:3000/reclaim/sign)

- **userId**: 'enter your codeforces username'
- **tag** : codeforces

**`services/codeforcesService.js`**

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
