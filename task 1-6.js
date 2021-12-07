//Реалізувати розбиття стрічки на слова у масив.


function strToArray(s) {
    var arr = s.split(' ');
    return arr;
}
var str = 'hello its meee i was wondering about the california dreams!'
console.log(strToArray(str));



// Написати функцію, яка поверне усі перестановки слова

function permutator(inputArr) {
    var results = [];

    function permute(arr, memo) {
        var cur, memo = memo || [];

        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}
console.log(permutator(['a', 'b', 'c', 'd']));



// Написати функцію, яка порахує факторіал натурального числа

function fact(n) {
    return (n < 1) ? 1 : n * (fact(n - 1));

}
console.log('\n');
var num = 5;
console.log(`${num}! = ${fact(num)}`);


//Знайти елемент із найбільшою частотою повторень
function mode(array) {
    if (array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0],
        maxCount = 1;
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}
var highestOccur = ['black', 'white', 'orange', 'blue', 'blue', 'white', 'orange', 'orange'];
console.log('\nWord with highest occurrecne:');
console.log(mode(highestOccur));
//Написати функцію, яка поверне кількість днів для заданого місяця та року
function getDaysNumber(month, year) {

    if (typeof year !== "number" || year <= 0)
        return "Invalid year"

    if (month % 2 === 0) {
        // Feb
        if (month === 2)
            return year % 4 === 0 ? 29 : 28;
        // Aug
        else if (month === 8)
            return 31;
        else
            return 30;
    } else 
    {
        if(month === 9 || month ===11){
            return 30;
        }
        else return 31;
    }
}

console.log(getDaysNumber(2, 2024));



//Написати реалізацію швидкого сортування масиву
var array = [24, 12, 51, 154, 23, 213, 1, 9, 70];

function quickSort(arr) {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (pivot > arr[i]) { left.push(arr[i]); } else { right.push(arr[i]); }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

console.log('\nSorted array by quick sort alogrithm:');
console.log(quickSort(array));
