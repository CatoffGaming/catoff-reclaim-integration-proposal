| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-2   | Medium Integration | Integration with Medium API to validate user publications | Steve Kimoi <kimoisteve.ke@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-21 |          |

## Title

Medium Integration

## Introduction

This proposal outlines the integration of Medium as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user publication data from Medium, such as the number of publications a user contributes to and their names. This will enable users to validate their Medium activity and use it for various challenges and verifications on the Catoff platform.

## External APIs Needed

- Medium API: https://api.medium.com/v1/users/{{userId}}/publications - Retrieves the publications of a user.

## Use Cases

1. **User Verification**: Verify the activity of users on Medium by checking their publications.
2. **Content Creator Validation**: Allow users to prove their status as content creators on Medium.
3. **Writing Portfolio**: Enable users to showcase their writing portfolio across different publications on Medium.

## Data Provider

- **Name**: Medium Publications - Fix
- **Hash Value**: 0x7d9e4f1c2b3a5e8f6d0c1b2a3e4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Medium integration. The full implementation follows the service file template.

**`services/mediumService.js`**

```javascript
const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processMediumData = async (proof, providerName) => {
  const accessToken = JSON.parse(proof[0].claimData.context).extractedParameters.accessToken;
  const userId = JSON.parse(proof[0].claimData.context).extractedParameters.userId;

  try {
    const response = await axios.get(`https://api.medium.com/v1/users/${userId}/publications`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const publications = response.data.data;
    const publicationCount = publications.length;
    const publicationNames = publications.map(pub => pub.name).join(', ');
    const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS);

    return new ReclaimServiceResponse(
      providerName,
      lastUpdateTimeStamp,
      userId,
      publicationCount,
      proof[0],
      {
        publicationNames: publicationNames
      }
    );
  } catch (error) {
    console.error('Error fetching Medium publications:', error);
    throw error;
  }
};