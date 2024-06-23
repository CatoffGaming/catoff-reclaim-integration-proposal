| proposal | title               | description                                              | author       | discussions-to             | status | type        | category | created    | requires |
|----------|---------------------|----------------------------------------------------------|--------------|----------------------------|--------|-------------|----------|------------|----------|
| CRIP-7   | Lichess Integration | Integration with Lichess API to validate user statistics | Gaurav Shah  | <gauravkshah312@gmail.com> | Draft  | Integration | CRIP     | 2024-06-20 |          |

## Title

Lichess Integration

## Introduction

This proposal outlines the integration of Lichess as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user activity and gameplay data of Lichess players, such as wins, draws, losses, username verification and multiple other metrics, to be used within the Catoff platform. This will enable users to validate their chess profiles and use them for various challenges and verifications related to e-sports challenges and chess based events on Catoff platform.

## External APIs Needed

- Lichess API: https://lichess.org/api

## Use Cases

1. **Player Verification**: Verify the activity of user on Lichess by checking their player profile and scores.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of past game activity.
3. **Skill Assessment**: Assess players' chess skills based on their past competition activity.

## Data Provider

- **Name**: Lichess
- **Hash Value**: [0xf02d001e7d9676cb422671420de325360988a49d8df75405c8c46b5969600994]

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Lichess player profile integration. The full implementation should follow the service file template.

**`services/pubgService.js`**

```javascript
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
  return response.data
}
```
