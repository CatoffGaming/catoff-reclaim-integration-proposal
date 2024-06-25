| proposal | title                | description                                            | author                      | discussions-to | status | type        | category | created    | requires |
|----------|----------------------|--------------------------------------------------------|-----------------------------|----------------|--------|-------------|----------|------------|----------|
| 1        | Twitter Likes Proof  | Integration with Twitter to prove likes on a specific tweet | Your Name pushpachhetri5@gmail.com |                | Draft  | Integration | CRIP     | 2024-06-25 |          |

## Title

Twitter Likes Proof Integration

## Introduction

This proposal outlines the integration with Twitter to generate ZKProofs for the number of likes on a specific tweet. This will allow users to prove their engagement on Twitter within the Catoff platform.

## External APIs Needed

- Twitter API

## Use Cases

- Verifying the number of likes on a tweet to prove social engagement.
- Allowing users to wager based on social media activity.

## Data Provider

- **Name**: Twitter
- **Hash Value**: <Hash Value from Reclaim Website>

## Code Snippet

```javascript
const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processTwitterLikesData = async (proof, providerName) => {
  const tweetData = JSON.parse(proof[0].claimData.context).tweet;
  const likes = tweetData.public_metrics.like_count;

  const url = JSON.parse(proof[0].claimData.parameters).url;
  const matchurl = url.match(/status\/([^\/]+)/);
  const tweetId = matchurl ? matchurl[1] : null;
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS);

  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, tweetId, parseInt(likes, 10), proof[0]);
};
