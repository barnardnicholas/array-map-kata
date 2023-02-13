Array.prototype.schmap = function (
  handler = (element, index, array) => element,
  thisArg
) {
  const _this = thisArg ? thisArg : this;
  const result = [];
  for (let i = 0; i < _this.length; i++) {
    result.push(handler(_this[i], i, _this));
  }
  return result;
};

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const array2 = [99, 999, 9999, 99999];

const newArray = array.schmap((e, i, arr) => {
  return e * 10;
}, array2);
console.log(newArray);
