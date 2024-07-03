const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');
const axios = require('axios');

const fetchFitbitProfile = async (token) => {
  const response = await axios.get('https://api.fitbit.com/1/user/-/profile.json', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data.user;
};

exports.processFitnessData = async (proof, providerName) => {
  const token = JSON.parse(proof[0].claimData.context).extractedParameters.accessToken;

  // Fetch profile data from Fitbit API
  const profileData = await fetchFitbitProfile(token);

  // Extract relevant data
  const processedData = {
    age: profileData.age,
    fullName: profileData.fullName,
    weight: profileData.weight,
    height: profileData.height,
    timezone: profileData.timezone,
    dateOfBirth: profileData.dateOfBirth,
    email: profileData.email,
    memberSince: profileData.memberSince,
  };

  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

  // Create and return a ReclaimServiceResponse object
  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, null, processedData, proof[0]);
};
