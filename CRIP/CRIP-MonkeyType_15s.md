| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-2   | Monkeytype Integration | Integration with MonekeyType to get users typing speed in 15 sec | Ashwin KV <ashwinkv.akv@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-05 |          |

## Title

Monkeytype Integration 15s

## Introduction

This proposal outlines the integration of monkeytype as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user top typing speed data of 15 seconds from monkeytype, such as username, WPM,Accuracy and Time of achivement to be used within the Catoff platform. This will enable users to validate their typing speed and use them for various challenges and verifications on Catoff.

## External APIs Needed

- nill

## Use Cases

1. **User Verification**: Validate users' typing speeds and accuracy to ensure they meet specific standards for challenges and competitions.
2. **Challenge Participation**: Allow users to participate in typing challenges that require proof of their fastest typing speed and accuracy.
3. **Skill Assessment**: Assess users' typing skills based on their best performance on Monkeytype, helping to identify areas of improvement and track progress.
3. **Leaderboard Ranking**: Create leaderboards on the Catoff platform based on users' fastest typing speeds and accuracy from Monkeytype
3. **Team Competitions**: Organize team-based typing competitions where each team member's performance on Monkeytype contributes to the team's overall score.

## Data Provider

- **Name**: Monkeytype 15 sec data
- **Hash Value**: 0x604f5228860b144b6e63ff47e541c1419b38d119cc3828a917dd9966dc7bb3a1

## Code Snippet

Below is a code snippet that demonstrates the key parts of the GitHub integration. The full implementation should follow the service file template.

**`services/monkeyTypeService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processMonkeyTypeData = async (proof, providerName) => {
  // Extract relevant data from the proof
  const wpm = JSON.parse(proof[0].claimData.context).extractedParameters.wpm
  const acc = JSON.parse(proof[0].claimData.context).extractedParameters.acc
  const timeStamp = JSON.parse(proof[0].claimData.context)
    .extractedParameters.completionTime
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .username

  const date = new Date(Number(timeStamp))
  // Options for formatting timestamp
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }

  // Format the date and time
  const completionTime = date.toLocaleString('en-US', options)
  // The complete processedData from monkeyType
  const ProcessedData = { 
    providerName,
    wpm,
    acc,
    completionTime,
    username,
  }
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  // Create a ReclaimServiceResponse object with the processed data
  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    ProcessedData,
    proof[0]
  )
}


```
