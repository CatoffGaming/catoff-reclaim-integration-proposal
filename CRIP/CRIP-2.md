| proposal | title                | description                                                              | author                                         | discussions-to | status | type        | category | created    | requires |
| -------- | -------------------- | ------------------------------------------------------------------------ | ---------------------------------------------- | -------------- | ------ | ----------- | -------- | ---------- | -------- |
| CRIP-1   | Leetcode Integration | Integration with Leetcode API to validate problems solved by programmers | Nilav Prajapati <nilavprajapati2004@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-12 |          |

## Title

Leetcode Integration

## Introduction

This proposal outlines the integration of Leetcode as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user activity data from Leetcode, such as total problems solved and in which languages, to be used within the Catoff platform. This will enable users to validate their Leetcode contributions and engagements in contests and use them for various challenges and verifications on Catoff.

## External APIs Needed

- Leetcode API: https://leetcode-api.p.rapidapi.com/

## Use Cases

1. **User Verification**: Verify the activity of users on Leetcode by checking their problems solved and contributions.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of Leetcode activity.
3. **Skill Assessment**: Assess users' coding skills like DSA and logical thinking through contests ,based on their Leetcode activity.

## Data Provider

- **Name**: Leetcode
- **Hash Value**: 0x10ff2f73e3abeafabc8713eb110b1ff98335a2caf8446447748de9402e5eebfb

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Leetcode integration. The full implementation should follow the service file template.

**`services/leetcodeService.js`**

```javascript
const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processLeetcodeData = async (proof, providerName) => {
  const leetcodeUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userName
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const solvedCount = await getUserSolved(leetcodeUsername)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    leetcodeUsername,
    solvedCount,
    proof[0]
  )
}

const getUserSolved = async username => {
  const url = `https://leetcode-api.p.rapidapi.com/user/${username}/solved`

  const response = await axios.get(url, {
    headers: {
      'x-rapidapi-key': `${process.env.X_API_KEY}`,
      'x-rapidapi-host': 'leetcode-api.p.rapidapi.com',
    },
  })
  console.log(response)
  return response
}
```
