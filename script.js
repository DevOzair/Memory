//our compuer choice array
let compChoice = [];
let clickCount = 0;
let colouredTilesCount = 0;

//custom event listener
const ALL_DIVS_ARE_COLORED = new Event('allDivsAreColored');
document.addEventListener('allDivsAreColored', (e) => {
    console.log("all divs are colored. Calling ClearTiles()");
    compChoice.sort((a, b) => b - a);
    clearTiles(compChoice);
});

//get game container
const container = document.querySelector('.container');
//create 9 divs and add them to the container
for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.id = `${i}`
    div.className = "tile";
    div.addEventListener("click", function () {detectUserClick(div.id)});
    container.appendChild(div);
}
//get button
var button = document.getElementById("start-game");

//add event listener to start game button
button.addEventListener('click', () => {
    
    //generate 4 random numbers between 0 and 8
    //and push them to the compChoice array if they are not already there
    while (compChoice.length < 4) {
        let rando = Math.floor(Math.random() * 9)
        if (!compChoice.includes(rando)) {
            compChoice.push(rando);
        }  
    }

   //sort numbers from lowest to highest
    compChoice.sort();
    console.log(compChoice);

    //display tiles
    DisplayTiles(compChoice);
    //clearTiles(compChoice); - cant really call this here as it will trigger before the tiles are displayed
});

//colour tiles
async function DisplayTiles(divs) {
    for (let i = 0; i < divs.length; i++) {
        const div = document.getElementById(divs[i]);
        await color(div, i);
    }
}
//color the divs
function color(divEl, i) {
    return new Promise(resolve => {
        divEl.style.backgroundColor = "green";
        setTimeout(() => {
            if(i == compChoice.length - 1) {
                document.dispatchEvent(ALL_DIVS_ARE_COLORED);
            }
            resolve();
        }, 2000);
    });
}


//uncolour tiles
async function clearTiles (divs) {
    for (let i = 0; i < divs.length; i++) {
        const div = document.getElementById(divs[i]);
        await uncolor(div);
    }
}
//uncolor the divs
function uncolor(divEl) {
    return new Promise(resolve => {
        divEl.style.backgroundColor = "lightgray";
        setTimeout(() => {
            
            resolve();
        }, 125);
    });
}


function detectUserClick(tile) {
    if(tile == compChoice[clickCount]) {
        document.getElementById(tile).style.backgroundColor = "green";
        clickCount++;
    }
    else {
        document.getElementById(tile).style.backgroundColor = "red";
    }    
}










/// old code ///
// function DisplayTiles(choices) {
//     choices.forEach((element, index) => {
//         let tile = document.getElementById(element);
//         setTimeout(() => {
//             tile.style.backgroundColor = "green";
//         }, 2000 * (index + 1));
//     });
// }
// function clearTiles (choices) {
//     setTimeout(() => {
//         choices.forEach((element) => {
//             let tile = document.getElementById(element);
//             tile.style.backgroundColor = "lightgray";
//         });
//     }, 10000)
// }