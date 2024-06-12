# Catoff Reclaim Integration Proposal

## Proposal Details

| Proposal ID | Title                 | Description                                                       | Author                                     | Discussions Link | Status | Type        | Category | Created    | Requires |
|-------------|-----------------------|-------------------------------------------------------------------|--------------------------------------------|------------------|--------|-------------|----------|------------|----------|
| CRIP-2      | Instagram Integration | Integration with Instagram API to validate user activity           | Deepak S <deepusuresh1212@gmail.com>       |                  | Draft  | Integration | CRIP     | 2024-06-12 |          |

## Title

Instagram Integration

## Introduction

This proposal outlines the integration of Instagram as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user activity data from Instagram, such as post history and engagement metrics, to be used within the Catoff platform. This will enable users to validate their Instagram activity and use it for various challenges and verifications on Catoff.

## External APIs Needed

- Instagram Basic Display API: https://developers.facebook.com/docs/instagram-basic-display-api

## Use Cases

1. **User Verification**: Verify the activity of users on Instagram by checking their post history and engagement metrics.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of Instagram activity.
3. **Influencer Engagement**: Enable influencers to showcase their engagement metrics and validate their influence on Catoff.

## Data Provider

- **Name**: Instagram User
- **Hash Value**: ....some random hash value

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Instagram integration. The full implementation should follow the service file template.

**`services/instagramService.js`**

```javascript
const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processInstagramData = async (proof, providerName) => {
  const instagramUsername = JSON.parse(proof[0].claimData.context)
    .extractedParameters.userName;
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  const postCount = await getUserPosts(instagramUsername);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    instagramUsername,
    postCount,
    proof[0]
  );
}

const getUserPosts = async (username) => {
  const instagramAccessToken = process.env.RECLAIM_INSTAGRAM_ACCESS_TOKEN;
  const userId = await getInstagramUserId(username, instagramAccessToken);
  const daysAgo = 3650;
  const dateSince = new Date(new Date().setDate(new Date().getDate() - daysAgo)).toISOString();
  
  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,timestamp&access_token=${instagramAccessToken}`;
  
  const response = await axios.get(url);
  const posts = response.data.data;

  const filteredPosts = posts.filter(post => new Date(post.timestamp) >= new Date(dateSince));
  
  console.log(`Total posts by ${username} in the last 10 years: ${filteredPosts.length}`);
  return filteredPosts.length;
}

const getInstagramUserId = async (username, accessToken) => {
  const url = `https://graph.instagram.com/v12.0/ig_hashtag_search?user_id=${username}&access_token=${accessToken}`;
  
  const response = await axios.get(url);
  const userId = response.data.id;
  
  if (!userId) {
    throw new Error('User ID not found');
  }
  
  return userId;
}
