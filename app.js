const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

myTeam = [];

//make a function to use inquirer to get info on your manager
//Then once I have the info, make a new manager with user.answers with your manager class
function createManager(){
    console.log("Begin building your team.")
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the manager's name?",
            validate: result => {
                if (result !=="") {
                    return true
                }
                return "You must enter at least one character.";
            }
        },
        {
            type: "input",
            name: "idNumber",
            message: "What is the manager's Id number?",
            validate: result => {
                const pass = result.match(/^[1-9]\d*$/)
                if (pass) {
                    return true;
                }
                return "You must enter a valid number.";
            }
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is the manager's email address?",
            validate: result => {
                const pass = result.match(
                    /\S+@\S+\.\S+/
                );             
                if (pass) {
                    return true
                }
                    return "You must enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            validate: result => {
                const pass = result.match(/^[1-9]\d*$/);
                if (pass) {
                    return true;
                }
                return "You must enter a valid number.";
            }
        },
    ]).then(results => {
        const manager = new Manager(results.managerName, results.idNumber, results.emailAddress, results.officeNumber);
        //push the new manager to an array
        myTeam.push(manager);
        //run a createTeam function
        createDevTeam();
    })
}

//in createDevTeam function, switch between creating an engineer, intern, or build out the team
function createDevTeam() {
    inquirer.prompt([
        {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "Employee",
            "There are no more team members to add.  I am ready to assemble my team."
        ]
        }
    ]).then(function (respondentChoice) {
            switch (respondentChoice.memberChoice) {
            case 'Engineer':
                return createEngineer();
                break;
        
            case 'Intern':
                return createIntern();
                break;

            case 'Employee':
                return createEmployee();
                break;

            default: 'quit'
                return assembleTeam();
            }
    });
}

//create a function to add an engineer
function createEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?",
            validate: result => {
                if (result !=="") {
                    return true
                }
                return "You must enter at least one character.";
            }
        },
        {
            type: "input",
            name: "idNumber",
            message: "What is the engineer's Id number?",
            validate: result => {
                const pass = result.match(/^[1-9]\d*$/);
                if (pass) {
                    return true;
                }
                return "You must enter a valid number.";
            }
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is the engineer's email address?",
            validate: result => {
                const pass = result.match(
                    /\S+@\S+\.\S+/
                );             
                if (pass) {
                    return true
                }
                    return "You must enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?",
            validate: result => {
                if (result !=="") {
                    return true
                }
                return "You must enter at least one character.";
            }
        }
    ]).then(results => {
        const engineer = new Engineer(results.engineerName, results.idNumber, results.emailAddress, results.github);
        //push the new manager to an array
        myTeam.push(engineer);
        //run a createTeam function
        createDevTeam();
    })
}

//create a function to add an intern
function createIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?",
            validate: result => {
                if (result !=="") {
                    return true
                }
                return "You must enter at least one character.";
            }
        },
        {
            type: "input",
            name: "idNumber",
            message: "What is the intern's Id number?",
            validate: result => {
                const pass = result.match(/^[1-9]\d*$/);
                if (pass) {
                    return true;
                }
                return "You must enter a valid number.";
            }
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is the intern's email address?",
            validate: result => {
                const pass = result.match(
                    /\S+@\S+\.\S+/
                );             
                if (pass) {
                    return true
                }
                    return "You must enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the intern's school?",
            validate: result => {
                if (result !== "") {
                    return true;
                }
                return "You must enter at least one character.";
            }
        }
    ]).then(results => {
        const intern = new Intern(results.internName, results.idNumber, results.emailAddress, results.school);
        //push the new manager to an array
        myTeam.push(intern);
        //run a createTeam function
        createDevTeam();
    })
}

//create function to add an employee
function createEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "employeeName",
            message: "What is the employee's name?",
            validate: result => {
                if (result !=="") {
                    return true
                }
                return "You must enter at least one character.";
            }
        },
        {
            type: "input",
            name: "idNumber",
            message: "What is the employee's Id number?",
            validate: result => {
                const pass = result.match(/^[1-9]\d*$/);
                if (pass) {
                    return true;
                }
                return "You must enter a valid number.";
            }
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is the employee's email address?",
            validate: result => {
                const pass = result.match(
                    /\S+@\S+\.\S+/
                );             
                if (pass) {
                    return true
                }
                    return "You must enter a valid email address.";
            }
        },
    ]).then(results => {
        const employee = new Employee(results.employeeName, results.idNumber, results.emailAddress);
        //push the new manager to an array
        myTeam.push(employee);
        //run a createTeam function
        createDevTeam();
    })
}

//create a function to build out your team

function assembleTeam () {
    fs.writeFileSync (outputPath, render (myTeam), "utf-8");
}

createManager();
