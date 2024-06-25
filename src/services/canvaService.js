const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processCanvaDesignData = async (proof, providerName) => {
  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  const username = extractedParameters.username; // Assuming the proof contains a username
  
  // Fetch user design data from Canva API (hypothetical endpoint)
  try {
    const canvaUserData = await axios.get(`https://api.canva.com/v1/users/${username}/designs`, {
      headers: {
        'Authorization': `Bearer YOUR_CANVA_API_TOKEN`
      }
    });

    // Example data processing (adjust based on actual API response)
    const designs = canvaUserData.data.designs.map(design => ({
      title: design.title,
      url: design.url,
      createdAt: design.created_at,
    }));

    console.log(`User: ${username}, Designs: ${JSON.stringify(designs)}`);

    const lastUpdateTimeStamp = proof[0].claimData.timestampS;

    return new ReclaimServiceResponse(
      providerName,
      lastUpdateTimeStamp,
      username,
      designs,
      proof[0]
    );
  } catch (error) {
    console.error(`Failed to fetch Canva data for user ${username}:`, error);
    throw new Error(`Failed to fetch Canva data for user ${username}`);
  }
};
