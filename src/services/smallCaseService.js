const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processSmallcaseData = async (proof, providerName) => {
    try {
        const userToken = JSON.parse(proof[0].claimData.context).extractedParameters.authToken;
        const lastUpdateTimeStamp = proof[0].claimData.timestampS;

        const { returns, networth } = await getSmallcaseReturns(userToken);

        return new ReclaimServiceResponse(
            providerName,
            lastUpdateTimeStamp,
            userToken,
            returns,
            networth,
            proof[0]
        );
    } catch (error) {
        console.error('Error fetching data from smallcase :', error);
        throw error;
    }
}

const getSmallcaseReturns = async userToken => {
    const url = `https://gatewayapi.smallcase.com/v1/gatewaydemo/engine/user/investments?aggregatedData=true`;
    const smallcaseApiSecret = process.env.SMALLCASE_API_SECRET;

    // this demo token can be used for testing.
    //const testingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzbWFsbGNhc2VBdXRoSWQiOiI2MzFmYWQwMWQ5ZmU3YmEzNGI2YzBhM2EiLCJleHAiOjE5MDAwMDAwMDB9.-_6ykYyKke4xuKImlYEPTX9fJhLoMU86qMHRX0YY6eA'

    const response = await axios.get(url, {
        headers: {
            'x-gateway-authtoken': userToken,
            'x-gateway-secret': smallcaseApiSecret
        },
    });

    console.log(`Returns : ${response.data.aggregated.totalReturns}`);
    console.log(`Net-worth : ${response.data.aggregated.networth}`);

    return { returns: response.data.aggregated.totalReturns, networth: response.data.aggregated.networth };
} 