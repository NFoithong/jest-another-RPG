//import (and mock) the necessary modules
const Enemy = require('../lib/enemy');
const Potion = require('../lib/potion');

jest.mock('../lib/potion');

// create a failing test to check for proper object creation
test('creates an enemy object', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));

});

//start with the getHealth() method. 
test("gets enemy's health value", () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});


// getHealth() method, we're going to add another method to check if the enemy is alive.
test('checks if enemy is alive or not', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;

    expect(enemy.isAlive()).toBeFalsy();
});

test("substracts from enemy's health", () => {
    const enemy = new Enemy('goblin', 'sword');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);

    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(99999);

    expect(enemy.health).toBe(0);
});

//write the tests and method to get a enemy's attack value
test("gets enemy's attack value", () => {
    const enemy = new Enemy('goblin', 'sword');

    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

//Write a new failing test to check for the enemy's description
test("gets enemy's description", () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});