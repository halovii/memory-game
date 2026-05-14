// (≧∇≦)ﾉ 13/05/26

// btns
const buttons = document.querySelectorAll('button');

// cards / game state UI
const onboarding = document.querySelector('.onboarding');
const playing = document.querySelector('.playing');
const finish = document.querySelector('.finish');

// grid 
const gridContainer = document.querySelector('.grid-container');
let gridItemsArr = [];

// finish pg
const recordsDiv = document.querySelector('.records-div');
recordsDiv.classList.add('hide'); // hide records div by default

// hide playing and finish screens by default
onboarding.classList.remove('hide');
playing.classList.add('hide');
finish.classList.add('hide');

// colour obj
const colourObj = {
    1: {colour: "#dfb4b4"},
    2: {colour: "#cebfa8"},
    3: {colour: "#cacea8"},
    4: {colour: "#a5c294"},
    5: {colour: "#a8ccce"},
    6: {colour: "#b7a8ce"},
    7: {colour: "#c2a8ce"},
    8: {colour: "#cea8c1"},

};



// when document loads, call init function
document.addEventListener('DOMContentLoaded', init);


function init() {
    console.log("DB: init()");

    // event delegation, listen for btn clicks
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(btn.className, "clicked"); // debug

            if (btn.className === "start-btn") {
                togglePlaying();
            }

            if (btn.className === "restart-btn") {
                reset();
            }
        });
    });
};

function shuffleArr(array) {
    //? fisher yates randomise order method :p
    console.log("DB: shuffleArr()");
    for (let j = array.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [array[j], array[k]] = [array[k], array[j]];
    };
    return array;
};



function togglePlaying() {
    console.log("DB: togglePlaying()");

    // show/hide screens
    onboarding.classList.add('hide');
    playing.classList.remove('hide');

    let score = 0;
    let values = [];
    let idNum = 0;

    // create 16 grid items, each with a random num between 1-8 2x
    for (let i = 1; i <= 8; i++) {
        values.push(i, i);
    };

    shuffleArr(values); // shuffle nums

    let gridItemsArr = [];
    values.forEach(num => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        gridItem.dataset.dataNum = num; // give each item a data-num attribute
        gridContainer.appendChild(gridItem);
        gridItemsArr.push(gridItem); //? use to reset board, check cards, etc


        // for debug, add nums to grid items
        // const p = document.createElement('p');
        // p.textContent = num;
        // gridItem.appendChild(p);
    });

    flipFunctionality();
};



function updateScore(score) {
    // console.log("DB updateScore()"); // debug
    const scoreLabel = document.querySelector('.score-label');
    scoreLabel.textContent = `score: ${score}`
};

function checkScore(score) {
    console.log("DB: checkScore()");
    if (score === 8) {
        console.log("all cards flipped :p");
        toggleFinish();
    };
};

function toggleFinish() {
    console.log("DB: toggleFinish()");
    playing.classList.add('hide');
    finish.classList.remove('hide');
};

function reset() {
    console.log("DB: reset()");
    gridItemsArr = [];

    // toggle screens
    onboarding.classList.remove('hide');
    finish.classList.add('hide');

    gridContainer.replaceChildren = "";
}

// function updateCardsColour(gridItems) {
//     gridItems.forEach(item => {
//         // default card bg
//         item.style.backgroundColor = "#915479";

//         // if card is flipped, show dif colour
//         if (item.classList.contains('flipped')) {
//             const num = item.dataset.dataNum;
//             const colour = colourObj[num].colour
//             console.log(colour);
//             item.style.backgroundColor = colour;
//         }
//     });
// }



function flipFunctionality() {
    console.log("DB: flipFunctionality()"); // debug
    let currFlippedNums = [];
    let currFlipped = [];
    let allFlippedCards = [];
    
    let score = 0;
    
    // loop all grid items, get the clicked item
    const gridItems = document.querySelectorAll('.grid-item');

    // remove all previous games grid items
    gridItems.forEach(item => {
        if (item.classList.contains('flipped')) {
            gridContainer.removeChild(item);
        }
    });
    

    gridItems.forEach(item => {
        item.addEventListener('click', e => {
            // add dif colours to pairs
            const num = item.dataset.dataNum;
            const colour = colourObj[num].colour
            item.style.setProperty('--item-colour', colourObj[num].colour)
            
            const targetItem = e.currentTarget;

            // prevent same card double click
            if (targetItem === currFlipped[0]) {
                return;
            };

            // add flipped css state to card
            targetItem.classList.add('flipped');
            

            // add datanum and card to arrays
            currFlippedNums.push(targetItem.dataset.dataNum); 
            currFlipped.push(targetItem); 
            console.log("currently flipped nums: ", currFlippedNums); // debug

            if (currFlipped.length === 2) { 
                
                // check if cards match, if yes, yahoo, if no, baka!!!
                if (currFlipped[0].dataset.dataNum === currFlipped[1].dataset.dataNum) { 

                    // debug log :p
                    console.log(`CARDS MATCH ☆*: .｡. o(≧▽≦)o .｡.:*☆ ${currFlippedNums[0], currFlippedNums[1]}`); // debug

                    // add matched class and add cards to allFlippedCards
                    currFlipped.forEach(card => card.classList.add('matched'));
                    allFlippedCards.push(currFlipped[0], currFlipped[1]);

                    // inc score, update it and check if it was the final match
                    score += 1;
                    updateScore(score);
                    checkScore(score);

                } else {
                    console.log("DB: no match");
                    setTimeout(() => {
                        currFlipped.forEach(card =>
                            card.classList.remove('flipped')
                        );
                        currFlippedNums = [];
                        currFlipped = [];

                    }, 1000);
                }
                // // empty arrays
                // currFlippedNums = [];
                // currFlipped = [];
            } 
        });
    });
};

//! double sides element
// if flipped show: 
    // img/item/icon/colour something
// if not (default unflipped) show
    // cutie bg/gradient something


//! to do
// fix bug where u can click many times, curr flipped cards not being emptied me thinks, //? nope not that, something else
// also maybe add a short delay when u get a match before toggling match css state, so user sees what colour matched
// also maybe a cute popup text saying "match!" and disable any clicks anywhere while that text is up
// add icon or something to cards
//* flip animation?
    //? fix issue where flip doesnt show on 2nd clicked card
//* update instructions on onboarding pg
// timer
    // could also do timer in top right or something?? to show user
// local storage record keeping
    // if doing local storage bob, add some input area for user's name :p


//! last to do:
// update read me