# memory game
13/05/26
A vanilla html, css and js stylised pastel colour memory matching game!  
[Play live here!](https://halovii.github.io/memory-game/)  

### img
[game states](./img/gameSS.png)
[gameplay preview gif](./img/gamegif.gif)  

### notes
This is one of my first complete personal projects, it combines a range of features like:
- Multiple page states, managed using functions to toggle the current page
- CSS animations for card flipping, 'match!' popup text and subtle hover states
- A built-in timer and ordered leaderboard system  

_Revision: 16/11/2026_
Since coming back to this project after a few months theres a few things that stand out to me improvement wise, these are mentioned below. Overall this project was a challenge but came together nicely and allowed me to see how individual pieces of code, eg. css animations, timers and intervals, etc... can fit together to complete a project! :)   


### improvements
_Game Tweaks:_
- Local storage system where records are saved for revisiting players
- Some visual tweaks, eg. icons or images rather than just colours on the cards
- A star system based on times, eg, <30s: platinum, 30-35s: gold, etc.. for the leaderboard  
_Code and Functionality:_
- Functionality separation so code is more readable and reusable, eg. flipFunctionality() could be separated into sections per task
- State management could be improved by tracking and toggling state using a more scalable solution, eg. states are stored as booleans in an object, updated as needed and a single render() function could manage updating the DOM. 