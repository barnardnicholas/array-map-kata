process.env.NODE_ENV = 'test';

const { expect } = require('chai');

Array.prototype.schmap = function (handler = (element, index, array) => element, thisArg) {
    const _this = thisArg ? thisArg : this;
    const result = [];
    for (let i = 0; i < _this.length; i++) {
        result.push(handler(_this[i], i, _this));
    }
    return result;
};

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const array2 = [99, 999, 9999, 99999];

describe('Array.prototype.schmap', () => {
    it('should return an array', () => {
        expect(array.schmap()).to.be.an('array');
    });
    it('should return an exact copy of the original array, given no arguments', () => {
        expect(array.schmap()).to.eql(array);
    });
    it('should not mutate original array', () => {
        const arrayCopy = [...array];
        array.schmap(e => e + 1);
        expect(array).to.eql(arrayCopy);
    });
});
