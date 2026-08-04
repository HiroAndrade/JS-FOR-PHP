// Controlling Flow 

// IF/ELSE

if ( 2 > 1){
    console.log('greater than')
}
else if(2 == 2){
    console.log('equal to')
}

// Ternary Operator

var value = ( 1<2 )? 'less than' : 'greater than';

var value = 'hello';

// Switch Case

switch (value){
    case 'Hello':
        // Do something 
        break;
    case 'World':

        break;

    default:
        break;

}

// FOR LOOP

for ( var ii = 0; ii < 10; ii++){
    console.log(ii);
}

var ii = 0;

while (ii < 10){
    console.log(ii);
    ii++;
}

var fruits = ['apple', 'banana', 'orange', 'cherry'];

for( var fruit of fruits){
    console.log(fruit);
}

// OBJECT

var person = {
    firstName : 'John',
    lastName: 'Doe'
};

for (var prop in person){
    console.log(`${prop}: ${person[prop]}`);
}