#! /usr/bin/env node

import inquirer from "inquirer";

type userType = {
    name: string,
    pin: number,
    balance: number,
};

let user: userType = {
    name: "Anna John",
    pin: 1321,
    balance: 50000,
};

console.log("Welcome to ATM built using TypeScript. There is a dummy user created named 'Anna John' having balance 50000. The pin is '1321'")

const answere = await inquirer.prompt([
    {
        message: "Please enter pin:",
        name: "pin",
        type: "password",
    },
]);

let continueTransaction: boolean = true

if (Number(answere.pin) !== user.pin) {
     console.log("You have entered an incorrect pin.");
}
else {
    while(continueTransaction == true) {

    const answere = await inquirer.prompt([
        {
            name: "selectedType",
            message: "Please select an option:",
            type: "list",
            choices: ["Withdraw", "Fast Cash", "Balance Inquiry"],
        },

        {
            name: "amount",
            message: "Please select amount:",
            type: "list",
            choices: ["500", "1000", "2000", "3000", "5000", "10000"],
            
            when(answere) {
                return answere.selectedType == 'Fast Cash';
            },
        },

        {
            name: "amount",
            message: "Please enter amount:",

            when(answere) {
                return answere.selectedType == 'Withdraw';
            },
        },

    ]);
 
    // To try another transaction.

    if(answere.selectedType == "Balance Inquiry") {
    console.log(`Your balance is: ${user.balance}`);
    const toRepeat = await inquirer.prompt([
        {
        name: "repeat",
        type: "confirm",
        message: "Do you want to try another transaction ?"
        }
]);

if (toRepeat.repeat == true)
    continueTransaction = true;

    else {
        continueTransaction = false;
    }
    }

    else {
    user.balance = user.balance - answere.amount;
    console.log(`Your new balance is: ${user.balance}`);
    continueTransaction = false;
    }

    }
};


