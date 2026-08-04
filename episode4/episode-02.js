
function doNothing(){ // undefined 

}

var foo = doNothing(); // undefined 

alert(sum(1,2));

function sum(a, b){
    return a + b; 
}

function diff(a,b){
    return a - b;
}

// Arrow Function
var multiply = (a, b) => a * b;


var divide = (a,b) => {

    if (b === 0){
        throw new Exception('b cannot be 0');
    }
    return a/b;
}

// Annonymous function 
//IIFE
(function(){
    var multiply = (a, b) => a * b;


    var divide = (a,b) => {

        if (b === 0){
            throw new Exception('b cannot be 0');
        }
        return a/b;
    }
    
})();