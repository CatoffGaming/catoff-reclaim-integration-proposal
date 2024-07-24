| proposal | title                      | description                                              | author                    | discussions-to | status | type        | category | created    | requires |
|----------|----------------------------|----------------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-11  | Leetcode Max Streak        | Integration with Leetcode to verify user max streak      | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Leetcode Max Streak Integration

## Introduction

This proposal outlines the integration of Leetcode as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process the maximum streak data from Leetcode, allowing users to validate their coding activity on the Catoff platform. This will enable users to use their Leetcode max streak data for various challenges and verifications on Catoff.

## External APIs Needed

- Leetcode API: Leetcode doesn't have a public API for streak data, so the integration will use data extraction methods from the Leetcode app/web.

## Use Cases

1. **User Verification**: Verify the max streak on a user's Leetcode account.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of their max streak on Leetcode.
3. **Coding Activity**: Validate users' coding activity based on their Leetcode max streak.

## Data Provider

- **Name**: Leetcode Max Streak
- **Hash Value**: 0x8bbe041be479e12ef2efee703fced2f4b605c4a6d69e9957d955bebb92ad30ed

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Leetcode integration. The full implementation should follow the service file template.

**`services/LeetcodeMaxStreakService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLeetcodeData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const maxStreak = extractedParameters.streak;

  console.log("The Maximum Streak on your Leetcode is:", maxStreak);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    maxStreak,
    proof[0]
  );
};
