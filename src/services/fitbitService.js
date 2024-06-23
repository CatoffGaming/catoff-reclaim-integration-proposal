const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');
const axios = require('axios');

const fetchFitbitData = async (url, token) => {
  const response = await axios.get(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};

exports.processFitnessData = async (proof, providerName) => {
  const token = proof[0].claimData.context.accessToken;

  const stepData = await fetchFitbitData('https://api.fitbit.com/1/user/-/activities/steps/date/today/1w.json', token);
  const heartRateData = await fetchFitbitData('https://api.fitbit.com/1/user/-/activities/heart/date/today/1w.json', token);
  const sleepData = await fetchFitbitData('https://api.fitbit.com/1.2/user/-/sleep/date/today/1w.json', token);
  const distanceData = await fetchFitbitData('https://api.fitbit.com/1/user/-/activities/distance/date/today/1w.json', token);
  const caloriesData = await fetchFitbitData('https://api.fitbit.com/1/user/-/activities/calories/date/today/1w.json', token);


  const steps = stepData['activities-steps'];
  const heartRates = heartRateData['activities-heart'];
  const sleep = sleepData['sleep'];
  const distances = distanceData['activities-distance'];
  const calories = caloriesData['activities-calories'];

  const lastUpdateTimeStamp = new Date().toISOString();

  // Process and structure data as needed
  const processedData = {
    steps,
    heartRates,
    sleep,
    distances,
    calories
  };

  // Create ReclaimServiceResponse object with the processed data
  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, null, processedData, proof[0]);
};
