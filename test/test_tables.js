let assert = require('assert');
let maya = require('../lib/index.js')

describe('Maya Present Table', function() {
    describe('getLetterOf()', function() {
        it('should return T for x=5 et y=3', function() {
            assert.equal(maya.presentTable.getLetterFor(5, 3), "T");
        });

        it('should return T for x=23 et y=3', function() {
            assert.equal(maya.presentTable.getLetterFor(23, 3), "T");
        });

        it(`should return "${maya.presentTable.defaultCharacter}" for x=23 et y=9`, function() {
            assert.equal(maya.presentTable.getLetterFor(23, 9), maya.presentTable.defaultCharacter);
        });
    });
});

describe('Maya Past Table', function() {
    describe('getLetterOf()', function() {
        it('should return K for x=2 et y=2', function() {
            assert.equal(maya.pastTable.getLetterFor(2, 2), "K");
        });

        it('should return K for x=10 et y=2', function() {
            assert.equal(maya.pastTable.getLetterFor(10, 2), "K");
        });

        it(`should return "${maya.pastTable.defaultCharacter}" for x=10 et y=9`, function() {
            assert.equal(maya.pastTable.getLetterFor(10, 9), maya.pastTable.defaultCharacter);
        });
    });
});