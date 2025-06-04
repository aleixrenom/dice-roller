# Code design choices

In this file I want to accumulate the reasonings behind different coding design choices made throughout the app. This should help with later reference and learning.

## Main page - Top bar

- Using a spacer between the buttons instead of space-between helps it adapt to a wider arrange of situations, and gives flexibility in case more elements are added in the future.

## Project structure

- Screens are big main pages of the app, for example the main screen with the rolls or the config screen for profile configuration.
- Utils refer to utility functions like the dice rolling.

## Rolls

- named_roll.tsx remains a presentational component, being passed the dice rolling functionality as props
- The state indicating active modifiers for each named roll will stay with the parent (probably main_screen.tsx), which will allow flexibility and scalability by allowing other future possible components easier access to this information.
