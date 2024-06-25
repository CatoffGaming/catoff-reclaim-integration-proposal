const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processMediumData = async (proof, providerName) => {
  // Extract the access token from the proof
  const accessToken = JSON.parse(proof[0].claimData.context).extractedParameters.accessToken;

  // Extract the user ID from the proof
  const userId = JSON.parse(proof[0].claimData.context).extractedParameters.userId;

  try {
    // Fetch user's publications using Medium API
    const response = await axios.get(`https://api.medium.com/v1/users/${userId}/publications`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const publications = response.data.data;

    // Process the publications data
    const publicationCount = publications.length;
    const publicationNames = publications.map(pub => pub.name).join(', ');

    // Extract additional relevant data from the proof
    const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS);

    // Create a ReclaimServiceResponse object with the processed data
    return new ReclaimServiceResponse(
      providerName,
      lastUpdateTimeStamp,
      userId,
      publicationCount,
      proof[0],
      {
        publicationNames: publicationNames
      }
    );
  } catch (error) {
    console.error('Error fetching Medium publications:', error);
    throw error;
  }
};