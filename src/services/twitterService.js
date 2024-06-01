const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processTwitterData = async (proof, providerName) => {
  const tweetViews = JSON.parse(proof[0].claimData.context).extractedParameters
    .postImpression
  const tweetViewsRegex = /title=\\"([\d,]+)/
  const tweetViewsValue = tweetViews.match(tweetViewsRegex)[1].replace(/,/g, '')

  const url = JSON.parse(proof[0].claimData.parameters).url
  const matchurl = url.match(/user\/([^\/]+)/)
  const username = matchurl ? matchurl[1] : null
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username,
    parseInt(tweetViewsValue, 10),
    proof[0]
  )
}
