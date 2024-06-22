| proposal | title                | description                                       | author                               | discussions-to | status | type        | category | created    | requires |
| -------- | -------------------- | ------------------------------------------------- | ------------------------------------ | -------------- | ------ | ----------- | -------- | ---------- | -------- |
| CRIP-1   | Duolingo Integration | Integration with Duolingo to validate user streak | Mudit Sarda <muditsarda23@gmail.com> |                | Draft  | Integration | CRIP     | 2024-06-21 |          |

## Title

Duolingo Integration for streak and XP check

## Introduction

This proposal details the integration of Duolingo as a data provider for the Catoff-Reclaim project. The goal is to retrieve and process user activity data from Duolingo, focusing on metrics like streak lengths and total XP gains. This integration will allow users to validate their Duolingo achievements and participate in challenges and verifications on the Catoff platform.

## External APIs Needed

- GitHub API: https://duolingo-api-roundeasy.vercel.app/

## Use Cases

1. **Longest Streak Challenge**: Verify and compare users' longest consecutive daily streaks on Duolingo and motivate continuous daily practice among participants.
2. **Total XP Gain Competition**: Track and reward the user with the highest XP gain over a specified period to encourage intensive engagement with lessons.
3. **New Language Learning Race**: Monitor and compare participants' progress in learning a new language from scratch to achieve early learning milestones.

## Data Provider

- **Name**: Duolingo - Languages and User details
- **Hash Value**: 0xaa94b8255dce666531744555cde3ebeae7cac105f7437f158052f94ea86d4942

## Code Snippet

Below is a code snippet that demonstrates the key parts of the Duolingo integration.

**`services/duolingoService.js`**

```javascript
// axios is not used because response could not be fetched by axios get method but by cURL.
// uncomment the lines below and comment line 4, 15, 18, 27 to use Axios.

// const axios = require('axios')
const { execSync } = require('child_process')
const { ReclaimServiceResponse } = require('../utils/reclaimServiceResponse')

exports.processDuolingoStreak = async (proof, providerName) => {
  try {
    const duolingoUserId = JSON.parse(proof[0].claimData.context)
      .extractedParameters.userId

    const lastUpdateTimeStamp = JSON.parse(proof[0].claimData.timestampS)

    const duolingoUrl = `https://www.duolingo.com/2023-06-19/users/${duolingoUserId}`
    const curlCommand = `curl -s ${duolingoUrl}`
    // const response = await axios.get(duolingoUrl)

    const curlOutput = execSync(curlCommand, { encoding: 'utf-8' })

    // if (response.status !== 200) {
    //   throw new Error(
    //     `Failed to fetch data from Duolingo for userId: ${duolingoUserId}`
    //   )
    // }

    // const userData = response.data
    const userData = JSON.parse(curlOutput)

    const username = userData?.username || 'Unknown'
    const currentStreakLength = userData?.streak || 0

    console.log(
      `User ${username} has a current streak of ${currentStreakLength} days.`
    )

    return new ReclaimServiceResponse(
      providerName,
      lastUpdateTimeStamp,
      username,
      { streak: currentStreakLength },
      proof[0]
    )
  } catch (error) {
    console.log('Error processing Duolingo streak data', error)
    throw error
  }
}
```
