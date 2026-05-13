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

    // create 16 grid items, each with a random num between 1-8 2x
    for (let i = 1; i <= 8; i++) {
        values.push(i, i);
    };

    shuffleArr(values); // shuffle nums

    gridItemsArr = [];
    values.forEach(num => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        gridItem.dataset.dataNum = num; // give each item a data-num attribute
        gridContainer.appendChild(gridItem);
        gridItemsArr.push(gridItem); //? use to reset board, check cards, etc

        // for debug, add nums to grid items
        const p = document.createElement('p');
        p.textContent = num;
        gridItem.appendChild(p);

    });


    flipFunctionality();
};



function updateScore(score) {
    // console.log("DB updateScore()"); // debug
    const scoreLabel = document.querySelector('.score-label');
    scoreLabel.textContent = `score: ${score}`
};

function checkScore(score) {
    if (score === 16) {
        console.log("DB: score: 16");
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

}


function flipFunctionality() {
    console.log("DB: flipFunctionality()"); // debug
    let currFlippedNums = [];
    let currFlipped = [];
    let allFlippedCards = [];
    
    let score = 0;

    // loop all grid items, get the clicked item
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', e => {
            const targetItem = e.currentTarget;
            
            currFlippedNums.push(targetItem.dataset.dataNum); 
            currFlipped.push(targetItem); 


            console.log("currently flipped NUMS arr: ", currFlippedNums); // debug

            if (currFlippedNums[0] === currFlippedNums[1]) {
                console.log(`CARDS MATCH ☆*: .｡. o(≧▽≦)o .｡.:*☆ ${currFlippedNums[0], currFlippedNums[1]}`);

                currFlipped.forEach(card => card.classList.add('matched')); // add matched class
                allFlippedCards.push(currFlipped[0], currFlipped[1]); // push the matched cards to allFlippedCards array

                // inc score when theres a match :pg
                score += 1;
                updateScore(score);
                //checkScore(score); //? also does same as below, figure out which to use

                console.log(allFlippedCards.length);
                if (allFlippedCards.length == 16) {
                    console.log("all cards flipped :p");
                    toggleFinish();
                }
            };
            
            // clear array if theres 2 cards storesd
            if (currFlippedNums.length == 2) {
                // check if cards match, if yes, yahoo, if no, baka!!!
                currFlippedNums = [];
                currFlipped = [];
            };
            
        
            //! fix
            // bug where u can click on the same card 2x and it counts as a match
            // score inc and update

            //! update score + 1 ------- //! fix this, only update score by 1 every click, but onyl 2 licks can happen at an interval, since its flip 2, check for match, yes> no> bakaaaaa
            // score += 1;
            // updateScore(score);
            // checkScore(score);
        });
    });

};

//! double sides element
// if flipped show: 
    // img/item/icon something
// if not (default unflipped) show
    // cutie bg/gradient something