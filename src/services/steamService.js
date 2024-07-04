const axios = require('axios')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processSteamData = async (proof, providerName) => {
    const steam_Id = JSON.parse(proof[0]?.claimData?.context).extractedParameters?.CLAIM_DATA // It will give me the Steam ID
    let url = JSON.parse(proof[0]?.claimData?.parameters).url // URl of the Steam Account
    const matchurl = url.match(/user\/([^\/]+)/)
    const steam_Username = matchurl ? matchurl[1] : null //if the match url is null it menas there is no username, so that username will be NULL
    const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)
    
    return new ReclaimServiceResponse(
        providerName,
        lastUpdateTimeStamp,
        steam_Username,
        parseInt(steam_Id, 10),
        proof[0]
    )
}