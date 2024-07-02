const axios = require('axios');
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processLumaEventData = async (proof, providerName, userId) => {
  try {
    const response = await axios.get(`https://api.lu.ma/public/v1/event/get-guests`, {
      headers: {
        Authorization: `Bearer ${process.env.LUMA_EVENT_API_KEY}`,
      },
    });

    const attendees = response.data.guests;
    const isAttending = attendees.some(guest => guest.id === userId); 

    const contextData = proof[0]?.claimData?.context;
    const newData = contextData ? JSON.parse(contextData).extractedParameters.newParameter : null;

    const parametersData = proof[0]?.claimData?.parameters;
    const url = parametersData ? JSON.parse(parametersData).url : null;
    const matchUrl = url ? url.match(/user\/([^\/]+)/) : null;
    const username = matchUrl ? matchUrl[1] : null;

    const timestampData = proof[0]?.claimData?.timestampS;
    const lastUpdateTimeStamp = timestampData ? JSON.parse(timestampData) : null;

    const reclaimResponse = new ReclaimServiceResponse(providerName, lastUpdateTimeStamp, username, newData, proof[0]);
    reclaimResponse.isAttendingEvent = isAttending;
    reclaimResponse.attendees = attendees;
    
    return reclaimResponse;
  } catch (error) {
    console.error('Error processing Luma event data:', error);
    throw error;
  }
};