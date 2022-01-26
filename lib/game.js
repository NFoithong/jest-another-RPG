// const player = new Player('Jane');

// player.getStats();
// player.getInventory();

//variable declarations
const inquirer = require('inquirer');
const Player = require('./player');
const Enemy = require('./enemy');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    this.currentEnemy = this.enemies[0];

    inquirer.prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            // test the object creation
            // console.log(this.currentEnemy, this.player);
            this.startNewBattle();
        });
}

//The startNewBattle() method will be called to kick off the first battle and then called again anytime a new round starts. We want this method to do the following things:
// -Establish who will take their turn first based on their agility values.
// -Display the Player object's stats.
// -Display the description of the current Enemy.

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());


    //The battle() method is the main event of the game that will run an indefinite number of times. Each time, it will either be the Player turn or the Enemy turn.
    this.battle();
};

//set up the basic battle() template
Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        // player prompts will go here
        inquirer.prompt({
                type: 'list',
                message: 'Waht would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if (action === 'Use potion') {
                    // follow up prompt will go here
                    if (!this.player.getInventory()) {
                        console.log("You do not have any potion!");
                        return;
                    }
                    inquirer.prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`) /* potions will go here */
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                        })
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};



module.exports = Game;