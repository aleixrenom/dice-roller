# Project Overview

A tabletop RPG (TTRPG) dice roller application designed for personal use. The app will allow users to create a named character (like a profile) and set named rolls for each, then roll those dice combinations with the click of a button.

# Objectives

- I want to offload all user effort into the configuration, and make it so the user doesn't have to do basically anything during play, just click the button and the dice will roll.

# MVP Features

## Configuration section

- Create a character profile (only name and avatar needed)
- Create named rolls for a character
- Create conditional modifiers for a named roll

### Definitions

- **Character profile**: A contained group of named rolls, representing a character in the TTRPG.
- **Named roll**: A set of dice to be rolled and modifiers to be added to the roll. For example "1d20+5" would roll one die with 20 sides and add 5 to the result. Each of these will have a name, for example the "1d20+5" could be named "Attack roll".
- **Conditional modifiers**: A list of rolls that could or could not be added to the named roll when it is rolled. For example "1d6" for "Hunter's mark".

## Use during play section

- Select active character profile
- Unordered list of named rolls
- Each named roll should have two options: roll, and select conditional modifiers
- Pressing the button to select conditional modifiers opens up a modal where you can select as many as you want from a checklist, then close the modal and those modifiers will be applied to the roll

# Out of Scope

- Roll history
- Exporting character profiles
- Database
- Special roll types (advantage, disadvantage, exploding dice, etc.)
