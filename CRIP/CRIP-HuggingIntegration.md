| proposal    | title               | description                                 | author                                       | discussions-to | status | type        | category | created    | requires |
| ----------- | ------------------- | ------------------------------------------- | -------------------------------------------- | -------------- | ------ | ----------- | -------- | ---------- | -------- |
| CRIP-Strava | Hugging Integration | Integration with Hugging to verify username | Ritik Prajapat <ritikprajapati084@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-14 |          |

## Title

Hugging Integration

## Introduction

This proposal outlines the integration of Strava as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process username on Hugging that is to be used within the Catoff platform. This will enable users to validate their claim regarding username needed for various challenges and verifications on Catoff.

## Use Cases

1. **User Verification**: Verify the activity of users on Hugging by checking their username.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of hugging activity.
3. **Skill Assessment**: Assess users' claim regarding hugging username.

## Data Provider

- **Name**: Hugging Face username dbg
- **Hash Value**: 0xfce8f4b1a3a162135da558676fec0ac61c0cc05a577af0b9420d3aed3e4c4839

## Code Snippet

Below is a code snippet that demonstrates the key parts of the GitHub integration. The full implementation should follow the service file template.

**`services/githubService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processhuggingData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(
    proof[0].claimData.context
  ).extractedParameters

  const username = extractedParameters.username

  console.log(`Hugging Face user: ${username}`)

  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    username,
    proof[0]
  )
}
```
