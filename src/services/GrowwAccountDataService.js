const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse');

exports.processGrowwAccountData = async (proof, providerName) => {
  console.log("Proof is: ", proof[0]);

  const extractedParameters = JSON.parse(proof[0].claimData.context).extractedParameters;
  
  const lastUpdateTimeStamp = proof[0].claimData.timestampS;
  const username = extractedParameters.username;
  const email = extractedParameters.email;
  const investmentStatus = extractedParameters.investment_status;
  const kycStatus = extractedParameters.kyc_status;
  const kycVerified = extractedParameters.kyc_verified;
  const phoneNo = extractedParameters.phoneNo;

  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Investment Status:', investmentStatus);
  console.log('KYC Status:', kycStatus);
  console.log('KYC Verified:', kycVerified);
  console.log('Phone Number:', phoneNo);

  return new ReclaimServiceResponse(
    providerName,
    lastUpdateTimeStamp,
    username, 
    100,
    proof[0]
  );
};
