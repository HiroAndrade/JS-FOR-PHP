import Game  from "./game.js";

let game;

function getBy(cssSelector){
    return document.querySelector(cssSelector);
}

const optionsCustomElement = getBy('#options-custom');
const optionsModeElement = getBy('#options-mode');
const form = getBy('#settings-form');
const allowDuplicatesElement = getBy('#allow-duplicates-checkbox');
const inputGessElement = getBy('#guess-input');
const feedbackElement = getBy('#guess-feedback');
const historyElement = getBy('#guess-history');
const gameAreaElement = getBy('#game-area');




export const ui = {

    get selectedTypeGame(){
        return form.elements.namedItem('game-type-selector').value;
    },

    get selectedTypeGame(){
        return allowDuplicatesElement.checked;
    },

    gameArea: {
        set disabled(value){

            const elements = gameAreaElement.querySelectorAll('input, button');

            for (let ii = 0; ii < elements.length; ii++){
                elements[ii].disabled = value;
            }

        },

        hide(){
            gameAreaElement.classList.add('hidden');
        },

        show(){
            gameAreaElement.classList.remove('hidden');
        }

    },

    settings: {

        set disabled(value){
            const elements = form.elements;

            for (let ii = 0; ii < elements.length; ii++){
                elements[ii].disabled = value;
            }

        }
    },

    changeGameType(id){

        if(optionsCustomElement.id === id){
            optionsCustomElement.className = 'inline';
            optionsModeElement.className = 'hidden';
        } else {
            optionsCustomElement.className = 'hidden';
            optionsModeElement.className = 'inline';
        }

    }, 

    getGuess(){
        return parseInt(inputGessElement.value);
    },

    reset(){
        this.resetHistory();
        this.resetGuess();
        this.showFeedback('');
    },

    resetHistory(){
        historyElement.innerHTML = '';
    },

    resetGuess(){
        inputGessElement.value = '';
        inputGessElement.focus();
    },

    showFeedback(result){
        feedbackElement.innerHTML = result;
    },

    updateHistory(result){
        historyElement.innerHTML += `<li>${result}</li>`;
    }

}


export async function init(){

        const savedGame = await Game.loaSavedGame();

        
            if(savedGame){
                 if(confirm('Do you want to continue the saved game?')){
                game = savedGame;
                ui.gameArea.show();
                ui.gameArea.disabled = false;
                ui.settings.disabled = true;

                game.history.forEach( value => ui.updateHistory(value));
            };
            }
            
           

        }

    document.addEventListener('click', function(e){

        if(e.target.id == 'submit-guess'){

            e.target.dispatchEvent(new CustomEvent('ui:submit-guess', {
                bubbles: true,
                detail: {
                    guess: ui.getGuess(),
                    game
                }
            }))
        
        } else if(e.target.id ==='end-game'){
            e.target.dispatchEvent(new Event('ui:end-game', {bubbles: true}));
        }
    });


    document.addEventListener('input', function(e){
    if(e.target.name !== 'game-type-selector'){
        return;
    }
    
    ui.changeGameType(e.target.value);

})

document.addEventListener('keydown', function(e){
    if(e.target.parentNode.id !== 'options-custom'){
        return;
    }

    if(e.target.id.indexOf('title') > -1){
        return;
    }

    const allowedKeys = [
        'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'
    ]

    const key = e.key;

    if(allowedKeys.includes(key) || key >= 0 && key <= 9){
        return;
    } else {
        e.preventDefault();
    }

})

document.getElementById('settings-form').addEventListener('submit', function(e){
    e.preventDefault();

    let titleElement = getBy('#input-title');
    let minRangeElement = getBy('#input-min-range');
    let maxRangeElement = getBy('#input-max-range');
    let maxAttemptsElement = getBy('#input-max-attempts');
    let gameLevelElement = getBy('#game-level');


    const submitterName = e.submitter.name;
    const allowDuplicateGuesses = ui.allowDuplicateGuesses;

    if(submitterName == 'play-game'){
        let title = titleElement.value;
        let minRange = minRangeElement.value;
        let maxRange = maxRangeElement.value;
        let maxAttempts = maxAttemptsElement.value;

        if(ui.selectedTypeGame === 'options-custom'){
            if(!title || !minRange || !maxRange || !maxAttempts){
                alert('Please enter all settings');
                return;
            }
        }
        else{

            let selectedOption = gameLevelElement.selectedOptions[0];

            minRange = selectedOption.getAttribute('data-min-range');
            maxRange = selectedOption.dataset.maxRange;
            maxAttempts = selectedOption.dataset.attempts;
        }

     

        ui.gameArea.show();

        ui.reset();
        game = new Game({minRange, maxRange, maxAttempts, allowDuplicateGuesses});
        ui.gameArea.disabled = false;
        ui.settings.disabled = true;

    }
    else{

        titleElement.value = '';
        minRangeElement.value = '';
        maxRangeElement.value = '';
        maxAttemptsElement.value = '';
        ui.reset();
        ui.gameArea.hide();
    }
});

