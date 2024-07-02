| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| 2        | Luma Event Attendance Integration | Integrate Luma API to fetch event attendance data | Sai Shankar <saishankar15052005@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-03 |          |

## Title

Luma Event Attendance Integration

## Introduction

This proposal aims to integrate Luma API to fetch event attendance data. The integration will allow users to verify the number of attendees at a specific Luma event.

## External APIs Needed

- Luma API: https://lu.ma/developer

## Use Cases

- Verify the number of attendees at a specific Luma event.

## Data Provider

- **Name**: Luma
- **Hash Value**: 0x1294155284153Bc7Ad7f1035cE0ea9d6EeBB07A6

## Code Snippet

```javascript
const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLumaEventData = async (proof, providerName) => {
  try {
    const eventId = 'your_event_id'; // Replace with actual event ID
    const apiKey = process.env.LUMA_API_KEY;

    const response = await axios.get(`https://api.lu.ma/v1/events/${eventId}/attendees`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    const attendees = response.data.attendees;
    const attendanceCount = attendees.length;

    const contextData = proof[0]?.claimData?.context;
    const newData = contextData ? JSON.parse(contextData).extractedParameters.newParameter : null;

    const parametersData = proof[0]?.claimData?.parameters;
    const url = parametersData ? JSON.parse(parametersData).url : null;
    const matchUrl = url ? url.match(/user\/([^\/]+)/) : null;
    const username = matchUrl ? matchUrl[1] : null;

    const timestampData = proof[0]?.claimData?.timestampS;
    const lastUpdateTimeStamp = timestampData ? JSON.parse(timestampData) : null;

    const reclaimResponse = new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, newData, proof[0]);
    reclaimResponse.attendanceCount = attendanceCount;

    return reclaimResponse;
  } catch (error) {
    console.error('Error processing Luma event data:', error);
    throw error;
  }
};
