| proposal    | title              | description                                    | author                               | discussions-to | status | type        | category | created    | requires |
| ----------- | ------------------ | ---------------------------------------------- | ------------------------------------ | -------------- | ------ | ----------- | -------- | ---------- | -------- |
| CRIP-Wordle | Wordle Integration | Integration with Worlde to validate user stats | Raazi Muhammed <raazi6163@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Wordle - The New York Times Integration

## Introduction

This proposal outlines the integration of Wordle as a data provider for the Catoff-Reclaim integration project. The integration aims to retrieve and process user activity data from Wordle, such as current streak, games played, games won, and maximum streak, to be used within the Catoff platform. This will enable users to validate their Wordle stats and use them for various challenges and verifications on Catoff.

## External APIs Needed

- None

## Use Cases

1. **User Verification**: Verify the activity of users on Wordle by checking their game stats.
2. **Challenge Participation**: Allow users to participate in challenges that require proof of Wordle activity.
3. **Streak Challenge**: Users must maintain or exceed their current Wordle streak over a set period to complete the challenge. For example, if a user has a streak of 5, they need to keep it or increase it for the next 7 days to win the challenge.
4. **Progress Tracking**: Allow users to track their Wordle progress over time on their Catoff profile, providing visualizations and insights into their gameplay patterns and improvements.
5. **Milestone Challenge**: Users must reach a specific milestone, such as playing 50 Wordle games, within a given period. For example, they need to play 50 games within a month to complete the challenge.

## Data Provider

- **Name**: Wordle Stats
- **Hash Value**: 0x9302f8ff496a87eb95982887c18e27ac35d8926c9b1a98db94263c7f5c3de4c9
