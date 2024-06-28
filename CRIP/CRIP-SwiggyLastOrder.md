| proposal | title                   | description                                         | author                    | discussions-to | status | type        | category | created    | requires |
|----------|-------------------------|-----------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-2   | Swiggy Last Order Price | Integration with Swiggy API to verify the last order price | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-28 |          |

## Title

Swiggy Last Order Price Integration

## Introduction

This proposal outlines the integration of Swiggy as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process the last order price data from Swiggy, allowing users to validate their last order price on the Catoff platform. This will enable users to use their Swiggy order data for various challenges and verifications on Catoff.

## External APIs Needed

- Swiggy API: Swiggy doesn't have a public API, so the integration will use data extraction methods from the Swiggy app/web.

## Use Cases

1. **User Verification**: Verify the last order price of users on Swiggy.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of their last Swiggy order price.
3. **Purchase History**: Validate users' purchase history based on their Swiggy order data.

## Data Provider

- **Name**: Swiggy Last Order Price
- **Hash Value**: 0xead50bf0e5ac604b58060993a9f8f27f6dc1d497be2212111c5582b30de61f7f

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Swiggy integration. The full implementation should follow the service file template.

**`services/swiggyLastOrderService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processSwiggyData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const lastOrderPrice = extractedParameters.lastOrderPrice;

  console.log('Swiggy Last Order Price:', lastOrderPrice);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'userSwiggy',
    lastOrderPrice,
    proof[0]
  );
}
