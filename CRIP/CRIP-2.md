| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-2   | X (Twitter) Integration | Integration with the X (Twitter) API to aggregate user contributions | zignis <zignis@icloud.com> |                | Draft  | Integration | CRIP     | 2024-06-10 |          |

## Title

X (Twitter) Integration

## Introduction

This proposal suggests integrating Twitter with the Catoff-Reclaim project. It aims to pull in data like tweet history, popular hashtags, and engagement metrics from Twitter to use on the Catoff platform. This way, users can verify their Twitter activities and participate in different challenges and verifications on Catoff.

## External APIs Needed

- Twitter API (v2): https://developer.x.com/en/docs/twitter-api

## Use Cases

1. **User verification**: Use the Twitter API to confirm the user's age, follower count, account age, and verification status.
2. **User engagement**: Count the tweets the user posted in the past 24 hours and calculate their average daily tweets over the last 31 days.
3. **Tweet history**: Check how many tweets the user made in the past 24 hours that include a hashtag or mention a user, like #CatoffChallenge.
4. **Post metrics**: Tally the views and likes on the user's tweets over a specific period.

## Data Provider

- **Name**: Twitter
- **Hash Value**: [Is this hexadecimal value random, or does it need to be obtained from somewhere?]

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Twitter integration.

**`services/twitterService.js`**

```js
const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processTwitterData = async (proof, providerName) => {
  const twitterUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userName
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const tweetCount = await getTweetCount(twitterUsername)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    twitterUsername,
    tweetCount,
    proof[0]
  )
}

const getTweetCount = async username => {
  const url = `https://api.twitter.com/2/tweets/counts/recent?query=${encodeURIComponent(`from:${username}`)}&granularity=day`
  const twitterToken = process.env.RECLAIM_TWITTER_TOKEN

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${twitterToken}`,
    },
  })

  const tweetCount = response.meta.total_tweet_count
  console.log(`Total tweets by @${username}: ${tweetCount}`)

  return tweetCount
}
```
