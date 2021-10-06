# Calculator in Space

Project completed as part of The Odin Project. Brief was to make a JavaScript calculator capable of basic mathematical operations (+, *, -, /, =) and to use event listeners and DOM manipulation to give the calculator an appealing design.

## What I hoped to learn with this project

- JavaScript: Array methods, DOM manipulation, event listeners.
- CSS: Make user of keyframes to make the buttons and displays more interactive.

## Post-project: Lessons learned.

- Problem solving: As my codebase grew, it became harder to judge how to build out new features. To solve this, I commented what the different if/else branches of my functions were doing and used this as a guide going forward.
- DOM Manipulation: Generated 650 stars using JavaScript and then posted them to the DOM. I used a random value for the stars’ margins, so a different constellation is generated each time the calcualtor is loaded. I also built a function to destroy space via the DOM when the user divides by zero.
- Keyframes: Used a for loop to assign keyframes classes to the stars to make them pulse and twinkle. I then combined this with a random assignment of the keyframes classes to the stars in JavaScript.
- Event listeners: I set event listeners on the keypad buttons, so that they flash green when pressed. This gives the calculator the illusion of having a backlight.
- Media queries: I had some issues with the sizing of certain parts of the calculator at mobile-size, so I made two media queries at 650px width and 580px width to solve this. 

## Potential future features

- Light-up the operator buttons white when activated, allowing the user to keep track of what operation they’re performing. Deactivate this effect when equals is pressed or a different operator is selected.
- Certain buttons on the calculator can be temporarily disabled (e.g. the delete button after a result is posted to the display). Disabled buttons could flash red, so it's more obvious to the user that they aren't functional.
- Add keyboard support for the calculator.

## Deployment

- Deployed via GitHub pages