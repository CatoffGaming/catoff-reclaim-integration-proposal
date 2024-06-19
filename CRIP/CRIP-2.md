| proposal | title                | description                    | author                     | discussions-to | status | type        | category | created    | requires |
|----------|----------------------|--------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-2   | YouTube Integration  | Integration with YouTube API to validate user activity | Jane Smith <jane.smith@example.com> |                | Draft  | Integration | CRIP     | 2024-06-20 |          |

## Title

YouTube Integration

## Introduction

This proposal outlines the integration of YouTube as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user activity data from YouTube, such as video uploads and channel contributions, to be used within the Catoff platform. This will enable users to validate their YouTube contributions and use them for various challenges and verifications on Catoff.

## External APIs Needed

- YouTube Data API: https://developers.google.com/youtube/v3

## Use Cases

1. **User Verification**: Verify the activity of users on YouTube by checking their video uploads and contributions.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of YouTube activity.
3. **Content Assessment**: Assess users' content creation skills and contributions based on their YouTube activity.

## Data Provider

- **Name**: YouTube Channel ID - Fix
- **Hash Value**: 0x34d74a2815c6a7c91170b89d3a8dec3b54f4f21f0baf223e677b9134b41f2c12

## Code Snippet

Below is a code snippet that demonstrates the key parts of the YouTube integration. The full implementation should follow the service file template.

**`services/youtubeService.js`**

```javascript
const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processYouTubeData = async (proof, providerName) => {
  const youtubeChannelId = JSON.parse(proof[0].claimData.context)
    .extractedParameters.channelId
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const videoCount = await getUserVideos(youtubeChannelId)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    youtubeChannelId,
    videoCount,
    proof[0]
  )
}

const getUserVideos = async channelId => {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${channelId}&part=id&order=date&type=video`
  const response = await axios.get(url)

  console.log(
    `Total videos by channel ID ${channelId}: ${response.data.items.length}`
  )
  return response.data.items.length
}


## Explanation

- **External APIs Needed**: The integration will use the YouTube Data API to fetch user activity data.
- **Use Cases**: Three primary use cases are outlined for user verification, challenge participation, and content assessment.
- **Data Provider**: Details about the data provider are included, along with a unique hash value for identification.
- **Code Snippet**: The code snippet includes functions for processing YouTube data and fetching the total number of videos uploaded by a channel.

This proposed YouTube integration will allow the Catoff platform to validate user contributions on YouTube, facilitating various challenges and verifications.
