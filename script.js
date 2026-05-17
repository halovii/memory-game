// (≧∇≦)ﾉ 13/05/26

// btns
const buttons = document.querySelectorAll('button');

// cards / game state UI
const onboarding = document.querySelector('.onboarding');
const playing = document.querySelector('.playing');
const finish = document.querySelector('.finish');

const pcHeader = document.querySelector('.pc-header');
pcHeader.classList.add('hide');

const inputName = document.getElementById('name');
const inputLabel = document.getElementById('name-label')

// timer
let startTime;
let timerInterval;
let finalTime;
const fcTimeLabel = document.querySelector('.fc-time-label');

let score = 0;

// grid 
const gridContainer = document.querySelector('.grid-container');
let gridItemsArr = [];

// hide match popup by default
const matchPopup = document.querySelector('.match-popup');
matchPopup.classList.add('hide');

// finish pg
const recordsDiv = document.querySelector('.records-div');
recordsDiv.classList.add('hide'); // hide records div by default
const recordsLabel = document.querySelector('.records-label');
let records = [];

// hide playing and finish screens by default
onboarding.classList.remove('hide');
playing.classList.add('hide');
finish.classList.add('hide');

// colour obj
const colourObj = {
    1: {colour: "#eea6a6"},
    2: {colour: "#f0bf76"},
    3: {colour: "#e5ebb7"},
    4: {colour: "#98e485"},
    5: {colour: "#83f3db"},
    6: {colour: "#7cafdf"},
    7: {colour: "#b19de9"},
    8: {colour: "#d892c6"},
};


// when pg loads, call init function
document.addEventListener('DOMContentLoaded', init);

// initialise start, event delegation, listen for btn clicks
function init() {
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.className === "start-btn") {
                if (inputName.value) { // if theres any value in name input field
                    togglePlaying();
                } else { // show invalid
                    inputName.style.borderColor = "#c95656";
                    inputLabel.style.color = "#c95656";
                    inputName.addEventListener('input', () => {
                        inputName.style.borderColor = "#e6e6e6";
                        inputLabel.style.color = "#e6e6e6";
                    });
                }
            };
            if (btn.className === "restart-btn") {
                reset();
            };
        });
    });
};

function shuffleArr(array) {
    //? fisher yates randomise order method :p
    for (let j = array.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [array[j], array[k]] = [array[k], array[j]];
    };
    return array;
};



function togglePlaying() {
    // show/hide screens, add score and timer labels
    onboarding.classList.add('hide');
    playing.classList.remove('hide');
    pcHeader.classList.remove('hide'); 

    let score = 0;
    let values = [];
    let idNum = 0;

    updateScore(score);

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

    });

    // start timer
    startTimer();
    // call functionality
    flipFunctionality();
};

function updateRecords() {
    console.log("updateRecords()");
    recordsDiv.classList.remove('hide');

    // create a new record and update UI
    createRecord();
};



//! dont think update records sort time is runnign at right time bc seconds order is wronggg



function createRecord() {
    let recordName = inputName.value;
    let recordTime = updateTimer(); // get final time

    
    records.push({user: recordName, time: recordTime}); // add record info as an obj
    console.log("DB: createRecord() values: ", recordName, ":", recordTime); // debug
    
    sortTimes(); //  sort records by shortest to longest time

    let clone = recordsLabel.cloneNode(true);
    clone.textContent = `${recordName} : ${recordTime}`
    recordsDiv.appendChild(clone);
};

function sortTimes() {
    console.log("checkTimes()");

    records.sort((a, b) => a.time - a.time);
    console.log("sorted records:", records);
};




function updateScore(score) {
    const scoreLabel = document.querySelector('.score-label');
    scoreLabel.textContent = `score: ${score}`
};

// timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);
};

function updateTimer() {
    const elapsed = Date.now() - startTime;
    const secs = (elapsed / 1000).toFixed(1);

    const timerLabel = document.querySelector('.timer-label');
    timerLabel.textContent = `time: ${secs}`;
    
    return finalTime = secs;
};

function stopTimer() {
    clearInterval(timerInterval);
};

function checkScore(score) {
    if (score === 8) {
        stopTimer(); // stop timer

        // wait .4s before toggling finish pg
        setTimeout(() => {
            toggleFinish();
        }, 400);
    };
};

function toggleFinish() {
    // hide other screens/ show finish screen
    playing.classList.add('hide');
    finish.classList.remove('hide');

    updateRecords();

    // update time label
    fcTimeLabel.textContent = finalTime;
};

function reset() {
    gridItemsArr = [];

    // toggle screens
    onboarding.classList.remove('hide');
    finish.classList.add('hide');
    matchPopup.classList.add('hide');

    gridContainer.replaceChildren = "";

    score = 0;
    canClick = false;

    inputName.style.borderColor = "#e6e6e6";
    inputLabel.style.color = "#e6e6e6";
}



function flipFunctionality() {
    let currFlippedNums = [];
    let currFlipped = [];
    let allFlippedCards = [];
    
    // loop all grid items, get the clicked item
    const gridItems = document.querySelectorAll('.grid-item');

    // remove all previous games grid items
    gridItems.forEach(item => {
        if (item.classList.contains('flipped')) {
            gridContainer.removeChild(item);
        }
    });
    
    let canClick = true;

    gridItems.forEach(item => {
        item.addEventListener('click', e => {
            if (!canClick) return;

            // add dif colours to pairs
            const num = item.dataset.dataNum;
            const colour = colourObj[num].colour
            item.style.setProperty('--item-colour', colourObj[num].colour)
            
            const targetItem = e.currentTarget;

            // prevent same card double click
            if (targetItem === currFlipped[0]) return;

            // add flipped css state to card
            targetItem.classList.add('flipped');
            
            // add datanum and card to arrays
            currFlippedNums.push(targetItem.dataset.dataNum); 
            currFlipped.push(targetItem); 
            // console.log("currently flipped nums: ", currFlippedNums); // debug

            if (currFlipped.length === 2) { 
                canClick = false;
                // check if cards match, if yes, yahoo, if no, baka!!!
                if (currFlipped[0].dataset.dataNum === currFlipped[1].dataset.dataNum) { 

                    console.log(`CARDS MATCH ☆*: .｡. o(≧▽≦)o .｡.:*☆ ${currFlippedNums[0], currFlippedNums[1]}`); // debug

                    // if cards match wait a tinsy before toggling matched state
                    setTimeout(() => {
                        // add matched class and add cards to allFlippedCards
                        currFlipped.forEach(card => card.classList.add('matched'));
                        allFlippedCards.push(currFlipped[0], currFlipped[1]);
                        
                        // do match popup animation
                        matchPopup.classList.remove('hide');
                        matchPopup.classList.add('animate');

                        matchPopup.addEventListener('animationend', () =>{
                            matchPopup.classList.remove('animate');
                            matchPopup.classList.add('hide');
                        })
    
                        currFlipped = [];
                        canClick = true;
                    }, 400);

                    // inc score, update it and check if it was the final match
                    score += 1;
                    updateScore(score);
                    checkScore(score);

                } else {
                    setTimeout(() => {
                        currFlipped.forEach(card =>
                            card.classList.remove('flipped')
                        );
                        currFlippedNums = [];
                        currFlipped = [];
                        canClick = true;

                    }, 1000);
                }
            } 
        });
    });
};


//! to do
//* fix bug where u can click many times, curr flipped cards not being emptied me thinks, //? nope not that, something else
//* also maybe add a short delay when u get a match before toggling match css state, so user sees what colour matched
//* also maybe a cute popup text saying "match!" 
            //? disable any clicks anywhere while that text is up
// add icon or something to cards
//* flip animation?
//*  fix issue where flip doesnt show on 2nd clicked card
//* update instructions on onboarding pg
//* timer
    //* could also do timer in top right or something?? to show user
// local storage record keeping
    // if doing local storage bob, add some input area for user's name :p


//!!! new bugs
//* reset function doesnt reset score
// soometimes cards are flipped or not reset back to default
// random extra card was there once
//? match popup shows on restart


// https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/
// https://www.w3schools.com/jsref/prop_win_localstorage.asp


//! last to do:
// update read me