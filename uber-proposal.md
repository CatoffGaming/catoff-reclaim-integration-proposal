| proposal | title             | description                                           | author                      | discussions-to | status | type        | category | created    | requires |
|----------|-------------------|-------------------------------------------------------|-----------------------------|----------------|--------|-------------|----------|------------|----------|
| 2        | Uber Rides Proof  | Integration with Uber to verify the number of rides in a month | Pushpa Chhetri <pushpachhetri5@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-25 |          |

## Title

Uber Rides Proof Integration

## Introduction

This proposal outlines the integration with Uber to generate ZKProofs for the number of rides taken in a month. This will allow users to prove their activity on Uber within the Catoff platform.

## External APIs Needed

- Uber API

## Use Cases

- Verifying the number of Uber rides taken in a month to prove travel activity.
- Allowing users to wager based on their travel frequency.

## Data Provider

- **Name**: Uber
- **Hash Value**: <Hash Value from Reclaim Website>

## Code Snippet

```javascript
const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processUberRidesData = async (proof, providerName) => {
  const rideData = JSON.parse(proof[0].claimData.context).rides;
  const totalRides = rideData.length;

  const url = JSON.parse(proof[0].claimData.parameters).url;
  const matchurl = url.match(/user\/([^\/]+)/);
  const username = matchurl ? matchurl[1] : null;
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS);

  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, parseInt(totalRides, 10), proof[0]);
};
