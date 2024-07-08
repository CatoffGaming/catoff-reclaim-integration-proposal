| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-2   | Monkeytype Integration | Integration with MonekeyType to retrive total tests completed | Ashwin KV <ashwinkv.akv@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-08 |          |

## Title

Monkeytype Integration tests Completed

## Introduction

This proposal outlines the integration of monkeytype as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user Total completed tests data from monkeytype, like username and Total Completed Tests to be used within the Catoff platform. This will enable users to validate their Test Completions and use them for various challenges and verifications on Catoff.

## External APIs Needed

- nill

## Use Cases

1. **User Verification**: Validate users' typing test completion to ensure they meet specific standards for challenges and competitions.
2. **Challenge Participation**: Enable users to join typing challenges that require a minimum number of completed tests on Monkeytype.
3. **Leaderboard Ranking**: Create leaderboards based on the total number of typing tests completed by users on Monkeytype.

## Data Provider

- **Name**: Monkeytype tests completed
- **Hash Value**: 0x450f9b9c600724a6bf54fce10171a5a7bca1273617c799c308337646b70e9e89

## Code Snippet

Below is a code snippet that demonstrates the key parts of the GitHub integration. The full implementation should follow the service file template.

**`services/monkeyTypeService-completion.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processMonkeyTypeCompletionData = async (proof, providerName) => {
  // Extract relevant data from the proof
  const completedTests = JSON.parse(proof[0].claimData.context)
    .extractedParameters.completedTests //Total completed test of the user
  const username = JSON.parse(proof[0].claimData.context).extractedParameters
    .username //user name of the proof
  // The complete processedData from monkeyType
  const ProcessedData = {
    providerName,
    completedTests,
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
