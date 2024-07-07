| proposal          | title                    | description                                          | author                               | discussions-to | status | type        | category | created    | requires |
| ----------------- | ------------------------ | ---------------------------------------------------- | ------------------------------------ | -------------- | ------ | ----------- | -------- | ---------- | -------- |
| CRIP-Spelling-bee | Spelling Bee Integration | Integration with Spelling Bee to validate user stats | Raazi Muhammed <raazi6163@gmail.com> |                | Draft  | Integration | CRIP     | 2024-07-07 |          |

## Title

Spelling Bee Integration

## Introduction

This proposal outlines the integration of daily puzzles into the Catoff platform for the Catoff-Reclaim integration project. The integration aims to track and validate user progress on daily puzzles, including metrics such as total words found, pangrams discovered, longest word, and the center letter used. This data will be utilized to enhance user engagement and provide interactive challenges based on daily puzzle achievements.

## External APIs Needed

- None

## Use Cases

1.  **Challenge Participation**: Enable users to participate in challenges that require proof of daily puzzle completion and achievements.
2.  **Longest Word Challenge**: Users must find the longest possible word in the daily puzzle to complete the challenge, leveraging the center letter provided.
3.  **Pangram Hunt**: Users are challenged to discover pangrams (words using every letter at least once) within the daily puzzle.

## Data Provider

- **Name**: Spelling Bee Stats
- **Hash Value**: 0x4a38917946919df457dab21b2b5cc927ea8a04dfb35c98833dce4c0a3b66eccb
