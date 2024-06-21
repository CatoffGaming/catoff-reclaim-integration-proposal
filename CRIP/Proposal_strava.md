# Strava-Integration-with-Catoff
| proposal | title              | description                                | author       | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|--------------------------------------------|--------------|----------------|--------|-------------|----------|------------|----------|
| 002      | Strava Integration | Integrate Strava data with Catoff platform | Manojkumar K <manojk030303@gmail.com> ,Bragadeesh V <bragadeesh2005@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-21 |          |

### Title
Strava Integration

### Introduction
The integration of Strava as a data provider will allow users to link their Strava accounts to the Catoff platform. This will enable the Catoff community to verify and showcase their fitness activities and achievements. By leveraging the Reclaim protocol, we can ensure the authenticity and integrity of the data imported from Strava.

### External APIs Needed
- **Strava API**: To fetch user activities, statistics, and achievements.
  - Base URL: https://www.strava.com/api/v3

### Use Cases
- **Athletes**: Showcase their fitness achievements and activities directly on their Catoff profiles.
- **Community**: Engage with other users based on their fitness activities and achievements.
- **Event Organizers**: Verify participants' fitness activities for event qualification.

### Data Provider
- **Name**: Strava
- **Hash Value**: e9aa6f761190f23c8b9cf1c9a5cef7cf3d647a354c9a29f3f075a4f9c5a4a52a

### Code Snippet
```javascript
// services/stravaIntegrationService.js
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');
const axios = require('axios');

exports.processStravaIntegrationData = async (proof, providerName) => {
  const stravaToken = JSON.parse(proof[0].claimData.context).extractedParameters.stravaToken;
  const url = `https://www.strava.com/api/v3/athlete/activities`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${stravaToken}`,
    },
  });

  const activities = response.data.map(activity => ({
    name: activity.name,
    distance: activity.distance,
    moving_time: activity.moving_time,
  }));
  const lastUpdateTimeStamp = new Date().toISOString();

  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, proof[0].claimData.parameters.userId, activities, proof[0]);
};
```

### Summary
This proposal aims to integrate Strava with the Catoff platform, allowing users to link their Strava accounts and showcase their fitness achievements. By leveraging the Reclaim protocol, we can ensure the authenticity of the imported data, providing value to athletes, the community, and event organizers. This project is open-source, encouraging community collaboration and contributions.
