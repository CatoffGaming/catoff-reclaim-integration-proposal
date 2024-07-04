| proposal | title              | description                                                | author                          | discussions-to | status | type        | category | created    | requires |
| -------- | ------------------ | ---------------------------------------------------------- | ------------------------------- | -------------- | ------ | ----------- | -------- | ---------- | -------- |
| CRIP-2   | Steam ID Integration | Integration with Steam to ret | John Doe <john.doe@example.com> |                | Draft  | Integration | CRIP     | 2024-06-01 |          |

## Title

Steam ID Integration

## Introduction

This proposal outlines the integration of Steam as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve Steam ID data from Steam, So we can know the player information through there Steam ID, to be used within the Catoff platform. This will enable users to validate their gaming activity and use it for various challenges and verifications on Catoff. Through this integration, users can leverage their Steam activity to participate in gamified experiences, earn rewards, and build their reputation on the Catoff platform.

## External APIs Needed

- No

## Use Cases

1. **User Verification**: Verify the activity of users on Steam by checking their Steam ID. This helps ensure that users are actively engaged in gaming and can authenticate their gaming history.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of Steam activity. Users can demonstrate their gaming skills and achievements to qualify for various gaming competitions and events on the Catoff platform.
3. **Skill Assessment**: Assess users' gaming skills and expertise based on their Steam activity. This includes evaluating the number of hours played, achievements unlocked, and games completed, providing a comprehensive view of a user's gaming proficiency.

## Data Provider

- **Name**: Steam ID - Fix
- **Hash Value**: 0x5f5312e27124dc7605f70a7d884e169049679b93f91c137b4d18a8569d825900

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Steam ID integration. The full implementation should follow the service file template.

**`services/githubService.js`**

```javascript
const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processSteamData = async (proof, providerName) => {
  const steam_Id = JSON.parse(proof[0]?.claimData?.context).extractedParameters
    ?.CLAIM_DATA // It will give me the Steam ID
  let url = JSON.parse(proof[0]?.claimData?.parameters).url // URl of the Steam Account
  const matchurl = url.match(/user\/([^\/]+)/)
  const steam_Username = matchurl ? matchurl[1] : null //if the match url is null it menas there is no username, so that username will be NULL
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    steam_Username,
    parseInt(steam_Id, 10),
    proof[0]
  )
}
```
