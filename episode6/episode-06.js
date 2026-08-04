import {ui, init} from './ui.js'

await init();


document.addEventListener('game:over', function(e){
    const secretNumber = e.detail.secretNumber;
    ui.showFeedback(`Game over! The secret number is ${secretNumber}`);
    ui.settings.disabled = false;
    ui.gameArea.disabled = true;
})

document.addEventListener('game:guess', function(e){

    const {guess, result, remainingAttempts } = e.detail;

    let json = JSON.stringify(e.detail);
    console.log(json);

    let obj = JSON.parse(json);

    console.log(obj);

    ui.updateHistory(`${guess} is ${result}`);
    ui.showFeedback(`You have ${remainingAttempts} remaining attempts.`);
})



document.addEventListener('ui:submit-guess', async function(e){

    const {guess, game} = e.detail;

    if(isNaN(guess) || guess < game.minRange || guess > game.maxRange){
        ui.showFeedback(`Please enter a valid number from ${game.minRange} and ${game.maxRange}`);
        ui.resetGuess();
        return;
    }

    await game.checkGuess(guess);

    ui.resetGuess();
})


document.addEventListener('ui:end-game', function(){
    ui.settings.disabled = false;
})













































// document.getElementById('play-game').addEventListener('click', function(e){
//     e.preventDefault();

//     let title = document.getElementById('input-title').value;
//     let minRange = document.getElementById('input-min-range').value;
//     let maxRange = document.getElementById('input-max-range').value;
//     let maxAttempts = document.getElementById('input-max-attempts').value;

//     if(!title || !minRange || !maxRange || !maxAttempts){
//         alert('Please enter all settings');
//         return;
//     }



//     let easyGame = new Game({minRange, maxAttempts, maxAttempts});
//     easyGame.play();
// })


// document.getElementById('clear-game').addEventListener('click', function(e){
//     e.preventDefault();

//     document.getElementById('input-title').value = '';
//     document.getElementById('input-min-range').value = '';
//     document.getElementById('input-max-range').value = '';
//     document.getElementById('input-max-attempts').value = '';

//     console.clear();
// })