| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-ChessRapidRatings   | Chess.com Integration | Integration with Chess.com API to validate user ratings | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-01 |          |

## Title

Chess Rapid Current and Best Ratings Integration

## Introduction

This proposal outlines the integration of Chess.com as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process rapid ratings ie the best and current rating of a user in chess.com Rapid format to be used within the Catoff platform. This will enable users to validate their Chess.com performance and use it for various challenges and verifications on Catoff.

## External APIs Needed

- Chess.com API: https://api.chess.com/pub/player/

## Use Cases

1. **User Verification**: Verify the activity of users on Chess.com by checking their current and best ratings.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of Chess.com activity.
3. **Skill Assessment**: Assess users' chess skills based on their rapid ratings and game history on Chess.com.

## Data Provider

- **Name**: Chess UserName - Fix
- **Hash Value**: 0x68274d4815b6a7c91170c89d3a8cec3b54f4e21f0faf223e677a9134a31f2b32

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Chess.com integration. The full implementation should follow the service file template.

**`services/chessRapidRatingsService.js`**

```javascript
const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processChessDotComData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const username = extractedParameters.user;
  console.log('Username is: ', username);

  // Fetch stats from Chess.com API
  const apiUrl = `https://api.chess.com/pub/player/${username}/stats`;
  try {
    const response = await axios.get(apiUrl);
    const stats = response.data;

    const { chess_rapid } = stats;
    
    console.log('Chess Rapid Current and Best Ratings:');
    console.log(`  Current Rating: ${chess_rapid?.last?.rating}`);
    console.log(`  Best Rating: ${chess_rapid?.best?.rating}`);

    const lastUpdateTimeStamp = proof[0].claimData.timestampS;

    return new ReclaimServiceResponse(
      providerName,
      lastUpdateTimeStamp,
      username,
      {
        currentRating: chess_rapid?.last?.rating,
        bestRating: chess_rapid?.best?.rating
      },
      proof[0]
    );
  } catch (error) {
    console.error(`Failed to fetch stats for user ${username}:`, error);
    throw new Error(`Failed to fetch stats for user ${username}`);
  }
};
