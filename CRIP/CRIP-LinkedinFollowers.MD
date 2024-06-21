| proposal | title               | description                     | author                          | discussions-to | status | type        | category | created    | requires |
|----------|---------------------|---------------------------------|---------------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-LinkedIn   | LinkedIn Follower Count Integration | Integration with LinkedIn API to validate total followers on the account of user | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-20 |          |

## Title

LinkedIn Follower Count Integration

## Introduction

This proposal outlines the integration of LinkedIn as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process total followers on the linkedin account of a user. This will enable users to validate their LinkedIn activities and use them for various challenges and verifications on Catoff.

## External APIs Needed

- LinkedIn API: No External api used

## Use Cases

1. **User Verification**: Verify the activity of users on LinkedIn by checking the number of followers on their profile.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of LinkedIn activity.
3. **Professional Assessment**: Assess users' professional network and engagement based on their LinkedIn activity.

## Data Provider

- **Name**: LinkedIn User Verification
- **Hash Value**: 0xe629105430c1a507cfe5c1f979d55103d967ca84ece2cbf1f233e5b5b22275da

## Code Snippet

Below is a code snippet that demonstrates the key parts of the LinkedIn integration. The full implementation should follow the service file template.

**`services/linkedinService.js`**

```javascript
const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLinkedInData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const followers = extractedParameters.Followers.replace(/,/g, '');

  const username = proof[0].claimData.owner;

  console.log(`Followers for user ${username}: ${followers}`);

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    parseInt(followers, 10),
    proof[0]
  );
};
