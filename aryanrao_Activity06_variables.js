/*
Aryan Rao
ISU NET ID: aryanrao
Feb 8, 2023
Activity06 - Variables
*/


console.log("-----I am in Variables-----")

// Q1: is it permitted the next?
console.log("Q1 ---------------")
var var1 = "Iowa";
console.log(var1);
var var1 = 124;
console.log(var1);
// Is it permited ?
console.log("Yes");


// Q2 : Is it valid ?
console.log("Q2 ----------------");
var2 = "Ames";
console.log(var2);
var2 = 124;
// Is it valid ?
console.log("Not possible re define using let");


// Q3 : Is it valid ?
console.log("Q3 ----------------");
let var3 = "ISU";
console.log(var3);
var3 = 2023;
console.log(var3);
console.log("Valid >>> yes this is valid")

// Q4 : Explain the Error.
console.log("Q4 ----------------");
let var4;
const var5=0;
console.log("What's the error: const need to be intialize ")


// Q5 : Explain the Error.
console.log("Q5 ----------------");
const var6 = 3.1415;
//var6 = 2.8;
console.log("What's the error : do not change the const value")

let firstName = "Abraham";
console.log(" ...replace this with your response.... ");
let numbers_2 = [1,2];
console.log(" ...replace this with your response.... ");
let city_state = "Ames Iowa";
console.log(" ...replace this with your response.... ");


// Q7 : What !! ??
let mainCity = "DesMoines";
console.log("This is the Capital :", mainCity)
console.log(" ....What's going on ? ....")



// Q8 : "let" and "const" scope vs "var" scope
if (5 === 5) {
    var var7 = 100;
    }
    console.log(var7);
    if (5 === 5) {
    var var8 = 100;
    }
    console.log(var8);
    console.log("let has scopy by block or curly bracket")