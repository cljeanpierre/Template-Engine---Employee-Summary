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
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the manager's name?",
        },
        {
            type: "input",
            name: "idNumber",
            message: "What is the manager's Id number?",
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is the manager's email address?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
        },
        {
            type: "input",
            name: "moreMembers",
            message: "Is there anyone else on your team?",
            choices: ["yes", "no"]
        }
    ]).then(results => {
        const manager = new Manager(results.managerName, results.idNumber, results.emailAddress, results.officeNumber, results.moreMembers);
        //push the new manager to an array
        myTeam.push(manager);
        //run a createTeam function
        createDevTeam();
    })
}

async function buildTeam () { 
    inquirer.prompt ([
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
]).then(results => {
    const members = new Members(results.teamMembers);
    createDevTeam();
})
}

async function moreMembers() {
    return inquirer.prompt(createDevTeam).then(function (results) {
        try {
            if (results.moreMembers === 'yes') {
                createDevTeam();
            } else {
                return "Your team has been assembled.";
            }
        }
        catch (error) {
            throw Error (error);
        }
    })
}
//in createDevTeam function, switch between creating an engineer, intern, or build out the team
async function createDevTeam() {
    return inquirer.prompt(buildTeam).then(function (resp) {
        try {
            switch (resp.choices) {
                case 'engineer':
                return createEngineer();
                break;

                case 'intern':
                return createIntern();
                break;

                case 'employee':
                return createEmployee();
                break;

                default: 'quit'
                return teamAssembled();
            }
        }
        catch (error) {
            throw Error (error);
        }
    })
}

//create a function to make an engineer
function createEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "idNumber",
            message: "What is the engineer's Id number?"
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is the engineer's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?"
        }
    ]).then(results => {
        const engineer = new Engineer(results.engineerName, results.idNumber, results.emailAddress, results.github);
        //push the new manager to an array
        myteam.push(engineer);
        //run a createTeam function
        createDevTeam();
    })
}
//create a function to make an intern
function createIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "idNumber",
            message: "What is the intern's Id number?"
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is the intern's email address?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the intern's school?"
        }
    ]).then(results => {
        const intern = new Intern(results.internName, results.idNumber, results.emailAddress, results.school);
        //push the new manager to an array
        myteam.push(intern);
        //run a createTeam function
        createDevTeam();
    })
}

function createEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "employeeName",
            message: "What is the employee's name?"
        },
        {
            type: "input",
            name: "idNumber",
            message: "What is the employee's Id number?"
        },
        {
            type: "input",
            name: "emailAddress",
            message: "What is the employee's email address?"
        },
    ]).then(results => {
        const employee = new Employee(results.employeeName, results.idNumber, results.emailAddress);
        //push the new manager to an array
        myteam.push(employee);
        //run a createTeam function
        createDevTeam();
    })
}
//create a function to build out your team

function teamAssembled () {
    console.log (myTeam);
    if (!fs.existsSync (OUTPUT_DIR)) {
        fs.mkdirSync (OUTPUT_DIR)
    }
    fs.writeFileSync (outputPath, render (myTeam), "utf-8");
}

function init() {
    createManager ();
}

init();

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
