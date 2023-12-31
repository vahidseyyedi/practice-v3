const { log } = require('console');
const { resolve } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class player {
    constructor(name, age, position) {
        this.name = name;
        this.age = age;
        this.position = position;
    }
}
class team {
    constructor(name, coach) {
        this.name = name;
        this.coach = coach;
        this.pl = [];
    }

    addPlayer(player) {
        this.pl.push(player);
    }
    removePlayer(name) {
        this.pl = this.pl.filter(player => player.name !== name)
    }
    selectall() {
        for (let i = 0; i < this.pl.length; i++) {
            const s = this.pl[i];
            console.log(s);
        }
    }
}
let t;

function receiveTeamName() {
    return new Promise((resolve, reject) => {
        rl.question("please enter team name: \n", (teamName) => {
            resolve(teamName);
        });
    });
}

function receiveCoachName() {
    return new Promise((resolve, reject) => {
        rl.question("please enter coach name: \n", (coachName) => {
            resolve(coachName);
        });
    });
}

function receiveNumberPlayer() {
    return new Promise((resolve, reject) => {
        rl.question("please enter number of players: \n", (number) => {
            resolve(number);
        });
    });
}

async function addTeam() {
    const teamName = await receiveTeamName();
    const coachName = await receiveCoachName();
    const numberPlayers = await receiveNumberPlayer();
    t = new team(teamName, coachName);
    console.log("save");
    addPlayerTeam(numberPlayers);
}

function receiveNamePlayer() {
    return new Promise((resolve) => {
        rl.question("Enter player name:", (name) => {
            resolve(name);
        });
    });
}

function receiveAgePlayer() {
    return new Promise((resolve) => {
        rl.question("Enter player age:", (age) => {
            resolve(age);
        });
    });
}

function receivePositionPlayer() {
    return new Promise((resolve) => {
        rl.question("Enter player position:", (position) => {
            resolve(position);
        });
    });
}

async function addPlayerTeam(number) {
    if (number == 0) {
        console.log("compleate");
        remove();
    } else {
        const name = await receiveNamePlayer();
        const age = await receiveAgePlayer();
        const position = await receivePositionPlayer();
        const player1 = new player(name, age, position);
        t.addPlayer(player1);
        console.log(player1);
        console.log("----------------------");
        addPlayerTeam(number - 1);
    }
}

function receiveNameRemove() {
    return new Promise((resolve) => {
        rl.question("please enter name for remove :", (name) => {
            t.removePlayer(name);
            resolve(name);
        });
    });
}

function remove() {
    rl.question("Do you want to remove the player? (y/n)", async (answer) => {
        if (answer == "y") {
            console.log(await receiveNameRemove());
            t.selectall();
            rl.close();
        } else {
            console.log("ok");
            rl.close();
        }
    });
}
addTeam();
