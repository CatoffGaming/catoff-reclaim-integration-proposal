/* To test, install 'jest' using the command:
 'npm install --save-dev jest' 
 and add the following code in 'scripts' section of 'package.json':
 {
  "scripts": {
    "test": "jest"
  }
 }
 and run the test unsing the command:
 'npm test'
*/

const { exec } = require('child_process')
const { processDuolingoStreak } = require('../src/services/duolingoService')
const {
  ReclaimServiceResponse,
} = require('../src/utils/reclaimServiceResponse')

describe('Longest Streak Challenge', () => {
  // Test for processing Duolingo streak data using cURL request because axios didn't seem to work
  test('should successfully process Duolingo streak data', async () => {
    const duolingoUserId = 23

    try {
      const proof = [
        {
          claimData: {
            context: JSON.stringify({
              extractedParameters: { userId: duolingoUserId },
            }),
            timestampS: JSON.stringify(Date.now()),
          },
        },
      ]
      const providerName = 'duolingo_streak'

      // Call the function with the real data
      const result = await processDuolingoStreak(proof, providerName)

      const expectedResult = new ReclaimServiceResponse(
        'duolingo_streak',
        JSON.parse(proof[0].claimData.timestampS),
        'Julika',
        { streak: 0 },
        proof[0]
      )

      // Assert the result
      expect(result).toEqual(expectedResult)
    } catch (err) {
      console.error('Error in test:', err)
      throw err
    }
  })
})
