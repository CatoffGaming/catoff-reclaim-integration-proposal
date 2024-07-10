| proposal | title              | description                   | author                     | discussions-to | status | type        | category | created    | requires |
|----------|--------------------|-------------------------------|----------------------------|----------------|--------|-------------|----------|------------|----------|
| CRIP-1   | Amazon Seller Integration | Integration with Amazon Seller API to verify orders | Aetesh Ch chaetesh@gmail.com |                | Draft  | Integration | CRIP     | 2024-07-09 |          |

## Title

Amazon Seller Integration

## Introduction

This proposal outlines the integration of Amazon Seller as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user order data from Amazon Seller, such as the number of orders sold, to be used within the Catoff platform. This will enable users to validate their sales performance and use it for various challenges and verifications on Catoff.

## External APIs Needed

- Amazon Seller API: https://developer-docs.amazon.com/sp-api/docs

## Use Cases

1. **User Verification**: Verify the sales activity of users on Amazon by checking their order history.
2. **Loan Applications**: Support users in providing verified sales data for loan or credit applications, showcasing their business performance.
3. **Tax Documentation**: Provide users with verified sales data for accurate and streamlined tax reporting and redemption.

## Data Provider

- **Name**: Amazon Seller Orders - Fix
- **Hash Value**: 0x37a34b1c65f5d2a8e74b919a8e7743b5c2e0c98b4d8b9c2f64e3e7e9a84a9f2e

## Code Snippet

Below is a code snippet that demonstrates the key parts of the GitHub integration. The full implementation should follow the service file template.

**`services/amazonSellerService.js`**

```javascript
const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processAmazonSellerData = async (proof, providerName) => {
  const sellerId = JSON.parse(proof[0].claimData.context).extractedParameters
    .sellerId
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const orderCount = await getSellerOrders(sellerId)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    sellerId,
    orderCount,
    proof[0]
  )
}

const getSellerOrders = async sellerId => {
  // Defining the start date to calculate orders
  const startDate = '2020-01-01'
  const endDate = new Date().toISOString().split('T')[0]
  const url = `https://sellingpartnerapi-na.amazon.com/orders/v0/orders?MarketplaceIds=ATVPDKIKX0DER&CreatedAfter=${startDate}&CreatedBefore=${endDate}&SellerId=${sellerId}`
  const amazonToken = process.env.RECLAIM_AMAZON_SELLER_TOKEN

  const response = await axios.get(url, {
    headers: {
      'x-amz-access-token': amazonToken,
      'x-amz-date': new Date().toISOString(),
      'x-amz-security-token': process.env.AMAZON_SESSION_TOKEN,
      Authorization: `AWS4-HMAC-SHA256 Credential=${process.env.AWS_ACCESS_KEY_ID}/${new Date().toISOString().split('T')[0]}/us-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date;x-amz-security-token, Signature=${process.env.AWS_SECRET_ACCESS_KEY}`,
    },
  })

  const orders = response.data.Orders
  console.log(
    `Total orders for seller ${sellerId} since ${startDate}: ${orders.length}`
  )
  return orders.length
}
```
