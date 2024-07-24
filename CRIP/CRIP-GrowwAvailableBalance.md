| proposal | title                   | description                                         | author                    | discussions-to | status | type        | category | created    | requires |
|----------|-------------------------|-----------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-5   | Groww Available Balance | Integration with Groww to verify available balance  | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Groww Available Balance Integration

## Introduction

This proposal outlines the integration of Groww as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process the available balance data from Groww, allowing users to validate their account balance on the Catoff platform. This will enable users to use their Groww available balance data for various challenges and verifications on Catoff.

## External APIs Needed

- Groww API: Groww doesn't have a public API, so the integration will use data extraction methods from the Groww app/web.

## Use Cases

1. **User Verification**: Verify the available balance on a user's Groww account.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of their available balance on Groww.
3. **Financial Status**: Validate users' financial status based on their Groww available balance.

## Data Provider

- **Name**: Groww Available Balance
- **Hash Value**: 0x8bbe041be479e12ef2efee703fced2f4b605c4a6d69e9957d955bebb92ad30ed

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Groww integration. The full implementation should follow the service file template.

**`services/GrowwAvailableBalanceService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGrowwAvailableBalance = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const availableBalance = extractedParameters.availableBalance;

  console.log("The available balance of your Groww account is: ", availableBalance);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt', 
    availableBalance,
    proof[0]
  );
};
