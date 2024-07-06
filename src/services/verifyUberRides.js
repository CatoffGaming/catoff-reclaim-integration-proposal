const { generateProof } = require('../services/reclaimProvider');

// Example function to verify the number of Uber rides taken in a month
const verifyUberRides = async (userId, month, numberOfRides) => {
  const statement = `User ${userId} took ${numberOfRides} Uber rides in ${month}`;
  try {
    const proof = await generateProof(userId, statement, 'UBER_PROVIDER');
    // Submit proof to Catoff or use as needed
    console.log(`Proof generated for Uber rides verification: ${JSON.stringify(proof)}`);
    return proof;
  } catch (error) {
    console.error('Error verifying Uber rides:', error);
    throw error;
  }
};

module.exports = verifyUberRides;
