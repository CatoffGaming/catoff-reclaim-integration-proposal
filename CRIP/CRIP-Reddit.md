# Reddit Post Karma Integration

## Proposal Template

| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| 001      | Reddit Post Karma Integration | Integration to track and verify Reddit post karma using Reclaim protocol | Aman Kumar Bairagi <amanbairagi1089@gmail.com> |                | Completed  | Integration | CRIP     | 2024-06-25 |          |

## Title

Reddit Post Karma Integration

## Introduction

This proposal outlines an integration for tracking and verifying a Reddit user's post karma using the Reclaim protocol. The goal is to create a provider that fetches a user's post karma from Reddit and generates zero-knowledge proofs (ZKProofs) for use within the Catoff platform.

## External APIs Needed

- Reddit API : https://oauth.reddit.com/api/v1/me

## Use Cases

1. **Karma Challenges**: Users can set challenges based on achieving a certain amount of post karma.
2. **Reputation Verification**: Verifying the credibility and activity of a user based on their post karma.
3. **Community Engagement**: Encouraging community participation by rewarding users with high post karma.

## Data Provider

- **Name**: KarmaSync
- **Hash Value**: 0xb56f4a35547da5a8acdf488cdb69b2a986c8f2aad6c403eb1bbb00a220689096

## Code Snippet

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processRedditData = async (proof, providerName) => {
    const accessToken = JSON.parse(proof[0].claimData.context).extractedParameters.accessToken

    try {
        const response = await axios.get('https://oauth.reddit.com/api/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const postKarma = response.data.link_karma;
        const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS);

        return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, postKarma, proof[0]);
    } catch (error) {
        console.error('Error fetching user data from Reddit:', error);
        throw error;
    }
}