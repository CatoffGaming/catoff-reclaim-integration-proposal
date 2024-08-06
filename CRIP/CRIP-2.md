| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-002 | Fitbit Steps Integration | Integrate Fitbit step count data with Reclaim Protocol for Catoff | Your Name 0xksure@gmail.com| | Draft | Integration | CRIP | 2024-08-06 | |

## Title

Fitbit Steps Integration for Reclaim Protocol

## Introduction

This proposal aims to integrate Fitbit step count data with the Reclaim Protocol for use within the Catoff platform. By leveraging Fitbit's OAuth 2.0 authorization and step count API, we can create zero-knowledge proofs of users' walking activities, enabling innovative fitness-based challenges and wagers on the Catoff platform.

## External APIs Needed

- Fitbit OAuth 2.0 API
- Fitbit Activities API (specifically, the step count endpoint)

## Use Cases

1. Daily Step Challenge: Users can create or participate in challenges to reach a certain number of steps per day, with wagers based on achieving the goal.
2. Weekly Fitness Competition: Groups can compete for the highest total step count over a week, with automated payouts to the winners.

## Data Provider

- **Name**: Fitbit
- **Hash Value**: [To be provided by Reclaim Protocol]

## Code Snippet

```javascript
const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processFitbitStepsData = async (proof, providerName) => {
  const fitbitUserId = JSON.parse(proof[0].claimData.context).extractedParameters.userId
  const lastUpdateTimeStamp = proof[0].claimData.timestampS
  const stepCount = await getUserSteps(fitbitUserId, accessToken)
  
  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    fitbitUserId,
    stepCount,
    proof[0]
  )
}

const getUserSteps = async (userId, accessToken) => {
  const today = new Date().toISOString().split('T')[0]
  const url = `https://api.fitbit.com/1/user/${userId}/activities/steps/date/today/1d.json`
  
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    
    const stepData = response.data['activities-steps'][0]
    console.log(`Total steps for ${userId} on ${today}: ${stepData.value}`)
    return parseInt(stepData.value, 10)
  } catch (error) {
    console.error('Error fetching Fitbit step data:', error.message)
    throw error
  }
}
}