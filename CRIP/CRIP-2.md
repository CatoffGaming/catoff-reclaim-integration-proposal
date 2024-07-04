| proposal | title                       | description                                           | author                     | discussions-to | status | type        | category | created    | requires |
|----------|-----------------------------|-------------------------------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| 2        | Fitbit Integration | Integrate Fitbit profile data into the Reclaim protocol for Catoff | Furqan Ahmad Khan <furqankhan5403@gmail.com>     |                | Draft  | Integration | CRIP     | 2024-06-27 |          |

## Title
Fitness Tracker Integration

## Introduction
This proposal aims to integrate Fitbit profile data into the Catoff platform using the Reclaim Protocol. This integration will allow users to verify their personal health information, such as age, full name, weight, height, timezone, date of birth, email, and membership date, while maintaining their privacy.

## External APIs Needed
- profile data = https://api.fitbit.com/1/user/-/profile.json
<!-- (Future Integrations: Apple Health API, Google Fit API) -->

## Use Cases
- **Personal Data Verification**: Users can verify their personal health information (age, full name, weight, height, timezone, date of birth, email, and membership date) to participate in various challenges and bets on the Catoff platform.
- **Age-Restricted Challenges**: Users can verify their age using Fitbit data to participate in age-restricted challenges or wagers.
- **Health Profile Verification**: Users can provide proof of their health profile to participate in health-related challenges or to earn rewards for maintaining a healthy lifestyle.
<!-- - Users can place bets on achieving daily step goals.
- Users can challenge each other to run a certain distance within a week.
- Users can verify their calorie burn goals to earn rewards. -->

## Data Provider
- **Name**: FitBit Profile Data
- **Hash Value**: 0x7207ccde281fad484a3fe2ac1a5d0b2d3d57664861c09ff8a1bc452db47a2adc

## Code Snippet

```javascript
// services/fitbitService.js
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');
const axios = require('axios');

const fetchFitbitProfile = async (token) => {
  const response = await axios.get('https://api.fitbit.com/1/user/-/profile.json', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data.user;
};

exports.processFitnessData = async (proof, providerName) => {
  const token = proof[0].claimData.context.accessToken;

  // Fetch profile data from Fitbit API
  const profileData = await fetchFitbitProfile(token);

  // Extract relevant data
  const processedData = {
    age: profileData.age,
    fullName: profileData.fullName,
    weight: profileData.weight,
    height: profileData.height,
    timezone: profileData.timezone,
    dateOfBirth: profileData.dateOfBirth,
    email: profileData.email,
    memberSince: profileData.memberSince,
  };

  const lastUpdateTimeStamp = new Date().toISOString();
  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, null, processedData, proof[0]);
};
