| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-2   | Monkeytype Integration | Integration with MonekeyType to get users typing speed in 10, 25, 50, 100 words test | Ashwin KV <ashwinkv.akv@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-08 |          |

## Title

Monkeytype Integration word test

## Introduction

This proposal outlines the integration of monkeytype as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user top typing speed data of 10, 25, 50 and 100 words from monkeytype, such as username, WPM,Accuracy and Time of achivement to be used within the Catoff platform. This will enable users to validate their typing speed and use them for various challenges and verifications on Catoff.

## External APIs Needed

- nill

## Use Cases

1. **User Verification**: Validate users' typing speeds and accuracy to ensure they meet specific standards for challenges and competitions.
2. **Challenge Participation**: Allow users to participate in typing challenges that require proof of their fastest typing speed and accuracy.
3. **Skill Assessment**: Assess users' typing skills based on their best performance on Monkeytype, helping to identify areas of improvement and track progress.
3. **Leaderboard Ranking**: Create leaderboards on the Catoff platform based on users' fastest typing speeds and accuracy from Monkeytype
3. **Team Competitions**: Organize team-based typing competitions where each team member's performance on Monkeytype contributes to the team's overall score.

## Data Providers

- **Name**: Monkeytype 10 words data
- **Hash Value**: 0xfa8b64a07cbd0aebfd20eaa87d45cc3648f1e3d95f412dd4315f7ae7753ec6f6

- **Name**: Monkeytype 25 words data
- **Hash Value**: 0xa6958ab53b10e8f186564da8f7720fb417b5de93a0f88e373f1f71a5360d309b

- **Name**: Monkeytype 50 words data
- **Hash Value**: 0x6e3bcdb3b7974c1884fb014b83d80adf4a4d403dd8ff220694c0ec002f3c5c1d

- **Name**: Monkeytype 100 words data
- **Hash Value**: 0x85a01e600e937277f19e16e05a067a357d3db3d21bb6a54b0370a9b2c79da105

## Code Snippet

Below is a code snippet that demonstrates the key parts of the GitHub integration. The full implementation should follow the service file template.

**`services/monkeyTypeService-WordsTest.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processMonkeyTypeData = async (proof, providerName) => {
  // Extract relevant data from the proof
  const wpm = JSON.parse(proof[0].claimData.context).extractedParameters.wpm //words per minute speed of the test
  const acc = JSON.parse(proof[0].claimData.context).extractedParameters.acc //accuracy of the test
  const timeStamp = JSON.parse(proof[0].claimData.context)
    .extractedParameters.completionTime // Completion time of the test
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .username //username of the proof

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
