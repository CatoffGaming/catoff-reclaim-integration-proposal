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