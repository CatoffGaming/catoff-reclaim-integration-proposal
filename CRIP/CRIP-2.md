| proposal | title                       | description                                           | author                     | discussions-to | status | type        | category | created    | requires |
|----------|-----------------------------|-------------------------------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| 2        | Fitness Tracker Integration | Integrate fitness tracking data to verify health goals | Your Name <Your Email>     |                | Draft  | Integration | CRIP     | 2024-06-22 |          |

## Title
Fitness Tracker Integration

## Introduction
This proposal aims to integrate Fitbit data into the Reclaim protocol for use within the Catoff platform. The integration will allow users to verify their fitness activities, such as step counts, heart rates, and sleep data, using zero-knowledge proofs generated from Fitbit data.

## External APIs Needed
- Steps: https://api.fitbit.com/1/user/-/activities/steps/date/today/1w.json
- Heart Rate: https://api.fitbit.com/1/user/-/activities/heart/date/today/1w.json
- Sleep: https://api.fitbit.com/1.2/user/-/sleep/date/today/1w.json
- distanceData: https://api.fitbit.com/1/user/-/activities/distance/date/today/1w.json
- caloriesData: https://api.fitbit.com/1/user/-/activities/calories/date/today/1w.json
<!-- (Future Integrations: Apple Health API, Google Fit API) -->

## Use Cases
- Users can verify their daily or weekly step counts to participate in fitness challenges or to show their physical activity levels for health-related rewards.
- Users can provide proof of their heart rate data over a period to demonstrate compliance with fitness or health monitoring programs.
- Users can verify their sleep patterns and quality to participate in wellness programs or to provide evidence for health improvement incentives.
<!-- - Users can place bets on achieving daily step goals.
- Users can challenge each other to run a certain distance within a week.
- Users can verify their calorie burn goals to earn rewards. -->

## Data Provider
- **Name**: Fitbit API Provider(needs to be created new provider for this)
- **Hash Value**: <Hash Value from Reclaim Website>

## Code Snippet

```javascript
// services/fitbitService.js
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');
const axios = require('axios');

const fetchFitbitData = async (url, token) => {
  const response = await axios.get(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};

exports.processFitnessData = async (proof, providerName) => {
  const token = proof[0].claimData.context.accessToken;

  // Fetch fitness data from Fitbit API
  const stepData = await fetchFitbitData('https://api.fitbit.com/1/user/-/activities/steps/date/today/1w.json', token);
  const heartRateData = await fetchFitbitData('https://api.fitbit.com/1/user/-/activities/heart/date/today/1w.json', token);
  const sleepData = await fetchFitbitData('https://api.fitbit.com/1.2/user/-/sleep/date/today/1w.json', token);

  // Process the fetched data
  const steps = stepData['activities-steps'];
  const heartRates = heartRateData['activities-heart'];
  const sleep = sleepData['sleep'];

  const lastUpdateTimeStamp = new Date().toISOString();

  // Create the processed data object
  const processedData = {
    steps,
    heartRates,
    sleep
  };

  // Create and return a ReclaimServiceResponse object
  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, null, processedData, proof[0]);
};
