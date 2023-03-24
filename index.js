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

Array.prototype.schmeduce = function(callback = (accumulator, currentValue, currentIndex, array) => accumulator, initialValue) {
    let acc = initialValue;

    for (let i = 0; i < this.length; i++) {
        acc = callback(acc, this[i], i, this);
    }

    return acc;
}

Array.prototype.schmoup = function(callback = (element) => element, thisArg) {
    const _this = thisArg ? thisArg : this;
    const result = {}
    for (let i = 0; i < _this.length; i++) {
        const key = `${callback(_this[i], i, _this)}`;
        if (!!result[key]) result[key].push(_this[i])
        else result[key] = [_this[i]];
    }
    return result
}

Array.prototype.schmoupToMap = function(callback = (element) => element, thisArg) {
    const _this = thisArg ? thisArg : this;
    const result = new Map();
    for (let i = 0; i < _this.length; i++) {
        const key = `${callback(_this[i], i, _this)}`;
        if (result.has(key)) result.set(key, [...result.get(key), _this[i]])
        else result.set(key, [_this[i]]);
    }
    return result
}

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
    it('should not mutate original array', () => {
        const arrayCopy = [...array];
        array.schmap(e => e + 1);
        expect(array).to.eql(arrayCopy);
    });
});

describe('Array.prototype.schmeduce', () => {
    it('should work', () => {
        const arrayCopy = [...array];
        expect(array.schmeduce((acc, curr) => acc + curr,0)).to.be.a('number');
        expect(array.schmeduce((acc, curr) => acc + curr,0)).to.equal(45);

         const result = array.schmeduce((acc, curr) => {
            return {...acc, [curr]: curr}
        },{});
        expect(result).to.haveOwnProperty(0);
        expect(result).to.haveOwnProperty(5);
        expect(result).to.haveOwnProperty(9);
        array.forEach(number => expect(result[number]).to.equal(number));
        
        expect(array).to.eql(arrayCopy);
    });
    
});

const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 12 },
    { name: "fish", type: "meat", quantity: 22 },
  ];

  const result = inventory.schmoupToMap(({type}) => type)
  console.log(result)

