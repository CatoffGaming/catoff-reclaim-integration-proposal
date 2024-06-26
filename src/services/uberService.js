const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processUberRidesData = async (proof, providerName) => {
  const rideData = JSON.parse(proof[0].claimData.context).rides;
  const totalRides = rideData.length;

  const url = JSON.parse(proof[0].claimData.parameters).url;
  const matchurl = url.match(/user\/([^\/]+)/);
  const username = matchurl ? matchurl[1] : null;
  const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS);

  return new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, parseInt(totalRides, 10), proof[0]);
};