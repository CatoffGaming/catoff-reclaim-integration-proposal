| proposal | title                            | description                                                 | author                    | discussions-to | status | type        | category | created    | requires |
|----------|----------------------------------|-------------------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-8   | Groww Ongoing and Closing Balance| Integration with Groww to verify ongoing and closing balances| Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Groww Ongoing and Closing Balance Integration

## Introduction

This proposal outlines the integration of Groww as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process the ongoing and closing balance data from Groww, allowing users to validate their financial status on the Catoff platform. This will enable users to use their Groww account balance data for various challenges and verifications on Catoff.

## External APIs Needed

- Groww API: Groww doesn't have a public API, so the integration will use data extraction methods from the Groww app/web.

## Use Cases

1. **User Verification**: Verify the ongoing and closing balances on a user's Groww account.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of their ongoing and closing balances on Groww.
3. **Financial Status**: Validate users' financial status based on their Groww ongoing and closing balances.

## Data Provider

- **Name**: Groww Ongoing and Closing Balance
- **Hash Value**: 0x8bbe041be479e12ef2efee703fced2f4b605c4a6d69e9957d955bebb92ad30ed

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Groww integration. The full implementation should follow the service file template.

**`services/GrowwOngoingAndClosingBalanceService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGrowwOngoingAndClosingBalance = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const ongoingBalance = extractedParameters.ongoingTransactionsBalance;
  const closingBalance = extractedParameters.closingBalance;

  console.log("The Ongoing Balance of your Groww account is:", ongoingBalance);
  console.log("The Closing Balance of your Groww account is:", closingBalance);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'ritikbhatt',
    ongoingBalance,
    proof[0]
  );
};
