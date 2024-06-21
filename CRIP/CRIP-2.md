| proposal | title                | description                    | author                     | discussions-to | status | type        | category | created    | requires |
|----------|----------------------|--------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-2   | YouTube Integration  | Integration with YouTube API to validate user engagement | Jane Smith <jane.smith@example.com> |                | Draft  | Integration | CRIP     | 2024-06-21 |          |

## Title

YouTube Engagement Integration

## Introduction

This proposal outlines the integration of YouTube as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user engagement data from YouTube, such as time spent watching videos, liked videos, and subscriptions, to be used within the Catoff platform. This will enable users to validate their YouTube engagement and use it for various challenges and verifications on Catoff.

## External APIs Needed

- YouTube Data API: https://developers.google.com/youtube/v3
- YouTube Analytics API: https://developers.google.com/youtube/analytics

## Use Cases

1. **User Verification**: Verify the engagement of users on YouTube by checking their watch time, liked videos, and subscriptions.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of YouTube engagement.
3. **Engagement Assessment**: Assess users' engagement with content on YouTube based on their activity.

## Data Provider

- **Name**: YouTube Engagement Data
- **Hash Value**: 0x5b3e8d5e1238a7b92f8d1234567a8f4c5a6b7d8e9f0a1b2c3d4e5f6g7h8i9j0k

## Code Snippet

Below is a code snippet that demonstrates the key parts of the YouTube integration for engagement data. The full implementation should follow the service file template.

**`services/youtubeEngagementService.js`**

```javascript
const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processYouTubeEngagementData = async (proof, providerName) => {
  const userAccessToken = proof[0].claimData.context.accessToken
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const watchTime = await getUserWatchTime(userAccessToken)
  const likedVideos = await getUserLikedVideos(userAccessToken)
  const subscriptions = await getUserSubscriptions(userAccessToken)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    { watchTime, likedVideos, subscriptions },
    proof[0]
  )
}

const getUserWatchTime = async accessToken => {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&myRating=like&key=${process.env.YOUTUBE_API_KEY}`
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const totalWatchTime = response.data.items.reduce((acc, item) => acc + item.statistics.viewCount, 0)
  console.log(`Total watch time: ${totalWatchTime}`)
  return totalWatchTime
}

const getUserLikedVideos = async accessToken => {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&myRating=like&key=${process.env.YOUTUBE_API_KEY}`
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  console.log(`Total liked videos: ${response.data.items.length}`)
  return response.data.items.length
}

const getUserSubscriptions = async accessToken => {
  const url = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&key=${process.env.YOUTUBE_API_KEY}`
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  console.log(`Total subscriptions: ${response.data.items.length}`)
  return response.data.items.length
}

## Explanation

- **External APIs Needed**: The integration will use the YouTube Data API and YouTube Analytics API to fetch user engagement data.
- **Use Cases**: Three primary use cases are outlined for user verification, challenge participation, and engagement assessment.
- **Data Provider**: Details about the data provider are included, along with a unique hash value for identification.
- **Code Snippet**: The code snippet includes functions for processing YouTube engagement data, including watch time, liked videos, and subscriptions.

This proposed YouTube integration will allow the Catoff platform to validate user engagement on YouTube, facilitating various challenges and verifications.

