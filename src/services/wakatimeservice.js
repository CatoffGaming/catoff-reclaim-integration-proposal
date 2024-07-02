const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processWakatimeData = async (proof, providerName, userId) => {
    try {
        const apiKey = process.env.WAKATIME_API_KEY;
        const response = await axios.get(`https://wakatime.com/api/v1/users/${userId}/durations`, {
            headers: {
                Authorization: `Basic ${apiKey}`,
            },
        });

        const durations = response.data.data;

        const newData = JSON.parse(proof[0]?.claimData?.context)?.extractedParameters?.newParameter;
        const newValue = newData ? newData.match(/value=\\"([\d,]+)/)[1].replace(/,/g, '') : null;

        const parametersData = proof[0]?.claimData?.parameters;
        const url = parametersData ? JSON.parse(parametersData).url : null;
        const matchUrl = url ? url.match(/user\/([^\/]+)/) : null;
        const username = matchUrl ? matchUrl[1] : null;

        const timestampData = proof[0]?.claimData?.timestampS;
        const lastUpdateTimeStamp = timestampData ? JSON.parse(timestampData) : null;

        // Create ReclaimServiceResponse object with processed data
        const reclaimResponse = new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, parseInt(newValue, 10), proof[0]);
        reclaimResponse.durations = durations; // Add Wakatime durations to the response

        return reclaimResponse;
    } catch (error) {
        console.error('Error processing Wakatime data:', error);
        throw error;
    }
};
