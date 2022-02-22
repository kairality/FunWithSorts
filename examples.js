/**
 * @param {number[]} arr
 * @return {number[]}
 */

 const pancakeSort = function(arr, flips = [], currSize = arr.length) {
    if (currSize === 0) {
        console.log(`Sorted Array: ${arr}`);
        //  returns the sequence of n elements we flipped to sort the array pancake style.
        return flips;
    }

    const findMaxUnsorted = () => {
        let maxIndex = 0;
        for (let i = 1; i < currSize; i++) {
            maxIndex = arr[i] > arr[maxIndex] ? i : maxIndex;
        }
        return maxIndex;
    }

    const flip = (array, index) => {
        if (index === 0) return array;
        left = array.slice(0, index + 1).reverse();
        right = array.slice(index + 1);
        // the number of elements we flipped.
        flips.push(index + 1);
        return [...left,...right];
    }

    let currMax = findMaxUnsorted();
    // no need to flip if the max is already at the end, just decrement the size.
    if (currMax === currSize - 1) {
        return pancakeSort(arr, flips, currSize - 1);
    }
    // tasty!
    let flapjacks;
    // if the unsorted max is in the front, flip the entire stack.
    if (currMax === 0) {
        console.log(`calling flip with ${arr} and ${currSize -1}`);
        flapjacks = flip(arr, currSize - 1);
        return pancakeSort(flapjacks, flips, currSize - 1);
    }
    // otherwise, flip all the elements of the array up to including the unsorted max
    // this will put the unsorted max in the front of the array and the next time around
    // it will be flipped to the back of the unsorted elements.
    console.log(`calling flip with ${arr} and ${currMax}`);
    flapjacks = flip(arr, currMax);
    return pancakeSort(flapjacks, flips, currSize);

};

// the leetcode explanation/solution has a bunch of constraints but this solution works with duplicates, negatives, and non-integers too!
const test = [235, 4, 40, 67, 109, 39, 49, 56, 532, 1028, 54, 36, 1729, 42, 42, 42, 42, -25, -34, 3.1415, -0.78, 3.14, Math.sqrt(2), 2.78, -500000];
console.log(pancakeSort(test));
