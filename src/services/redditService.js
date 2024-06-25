const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processRedditData = async (proof, providerName) => {
    const accessToken = JSON.parse(proof[0].claimData.context).extractedParameters.accessToken

    try {
        const response = await axios.get('https://oauth.reddit.com/api/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const postKarma = response.data.link_karma;
        const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS);

        return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, postKarma, proof[0]);
    } catch (error) {
        console.error('Error fetching user data from Reddit:', error);
        throw error;
    }
}
