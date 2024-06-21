const axios = require('axios')
require('dotenv').config()
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processEtherscanData = async (proof, providerName) => {
  const address = JSON.parse(proof[0].claimData.context).extractedParameters
    .userName
  const lastUpdateTimeStamp = proof[0].claimData.timestampS

  const txnCount = await getTransactionCount(address)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    address,
    txnCount,
    proof[0]
  )
}

const getTransactionCount = async address => {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`

  const data = await axios.get(url)
  const response = data.result.length

  console.log(`Total Transactions of address ${address} is ${response}`)
  return response
}
