// const { expect } = require('@jest/globals');
// const { test } = require('picomatch');
// const { jsxText } = require('@babel/types');
// const { jest } = require('@jest/globals');

const Potion = require('../lib/potion');

jest.mock('../lib/potion');

// console.log(new Potion());


const Player = require('../lib/player');
// const { test } = require('picomatch');
// const { expect } = require('@jest/globals');

test('create a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));

});

test("get player's stats an object", () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});