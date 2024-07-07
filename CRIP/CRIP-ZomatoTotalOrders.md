| proposal | title                   | description                                         | author                    | discussions-to | status | type        | category | created    | requires |
|----------|-------------------------|-----------------------------------------------------|---------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-3   | Zomato Total Orders     | Integration with Zomato API to verify the total number of orders | Ritik Bhatt <ritikbhatt020@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Zomato Total Orders Integration

## Introduction

This proposal outlines the integration of Zomato as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process the total number of orders data from Zomato, allowing users to validate their order history on the Catoff platform. This will enable users to use their Zomato order data for various challenges and verifications on Catoff.

## External APIs Needed

- Zomato API: Zomato doesn't have a public API, so the integration will use data extraction methods from the Zomato app/web.

## Use Cases

1. **User Verification**: Verify the total number of orders of users on Zomato.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of their total Zomato order count.
3. **Purchase History**: Validate users' purchase history based on their Zomato order data.

## Data Provider

- **Name**: Zomato Total Orders
- **Hash Value**: 0xead50bf0e5ac604b58060993a9f8f27f6dc1d497be2212111c5582b30de61f7f

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Zomato integration. The full implementation should follow the service file template.

**`services/ZomatoTotalOrdersService.js`**

```javascript
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processZomatoData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const numberOfOrders = extractedParameters.ordersCount;
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;

  console.log('Total Number of orders are: ', numberOfOrders);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    'username', 
    numberOfOrders,
    proof[0]
  );
};
