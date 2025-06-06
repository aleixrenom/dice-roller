# Design of the MVP

I'll leave here the ideas I have for the initial design of the app.

## Main screen

- Small top bar with "edit profiles" button on the left, and "choose profile" button on the right.
  - Choose profile button has the name fo the profile followed by the avatar
- The rest of the screen is a vertical scrollable list of named roll components

## Named roll

- Being right handed, I'll put the roll button and the modifiers button on the right, one on top of the other with the roll one being much more prominent.
- On the left and occupying the majority of the component will be the box for the roll's result, with the name of the roll and the roll's description on top.
  - The name of the roll will be ontop of the roll's description, and the description will be the dice and modifiers that will be rolled, displayed in a fainter and smaller font.

## Modifiers

- The modifiers button on every named roll will open a modal where the user will be able to select modifiers to the dice roll using checkboxes.
- After being selected, the user will be able to either press save or click outside the modal box to accept the selected modifiers.
- The selected modifiers will be displayed on the description of the roll, under the name, over the result box. They will be shown in the same string following the base roll.
- When clicking the roll button, the roll will include the selected modifiers.
- This all means that possible modifiers need to be stored together with the named roll information.

### Details

- After having selected modifiers and closed the modal, if you open the modal again the modifiers you selected previously will still be selected, ready to be deselected if so desired.
- To account for an arbitrary number of modifiers and different screen sizes, the modifiers list in the modal will be scrollable. However, the save button on the bottom of the modal will always be visible.
