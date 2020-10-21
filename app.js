const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

myTeam = [];

//make a function to use inquirer to get info on your manager
//Then once I have the info, make a new manager with user.answers with your manager class
function createManager(){
    console.log("Please type in your manager's information...");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
        },
        {
            type: "input",
            name: "idNumber",
            message: "What is your manager's Id number?",
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is your manager's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?",
        }
    ]).then(results => {
        const manager = new Manager(results.managerName, results.idNumber, results.emailAddress, results.officeNumber);
        //push the new manager to an array
        team.push(manager)
        //run a createTeam function
        createDevTeam();
    })
}

const buildTeam = [
    {
        type: "list",
        name: "teamMembers",
        message: "Choose the next team member.",
        choices: [
            "Engineer",
            "Intern",
            "Employee",
        ]
    }
]
//in createDevTeam function, youll want to switch between creating an engineer, intern, or build out the team


//create a function to make an engineer
function createEngineer(){
    console.log("Please type in your Engineer's information...");
    inquirer.prompt([
        {
            type: "input",
            name: "engineer",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's Id number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?"
        }
    ]).then(results => {
        const manager = new Manager(results.managerName, );
        //push the new manager to an array
        //run a createTeam function
    })
}
//create a function to make an intern

//create a function to build out your team






// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
