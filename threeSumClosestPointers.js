#!/usr/bin/env node

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var lineIndex = 0

var target = 0
var inputNumbers = []
var result = 0
var difference = Infinity

rl.on('line', function (line) {
    // console.log('current line: ', line)
    // console.log('current lineIndex: ', lineIndex)
    if (lineIndex == 0) { // 1st line specifies target

        target = line * 1
        lineIndex += 1

    } else { // 2nd line has the input numbers

        inputNumbers = line.split(' ').map(num => num * 1).sort((a, b) => { return a - b })

        // console.log(inputNumbers)

        if (inputNumbers.length < 3) { return } // need at least 3 numbers to work with

        // console.log(`result: ${result}, difference: ${difference}`)

        for (var i = 0; i < inputNumbers.length; i++) {

            var leftPointer = i + 1
            var rightPointer = inputNumbers.length - 1

            while (rightPointer > leftPointer) {

                var newResult = inputNumbers[i] + inputNumbers[leftPointer] + inputNumbers[rightPointer]

                if (newResult == target) { // exact match, so we can end early
                    console.log(newResult)
                    rl.close()
                    rl.removeAllListeners()
                    return
                }

                // decide which pointer to move 
                if (target > newResult) {
                    leftPointer += 1
                } else if (newResult > target) {
                    rightPointer -= 1
                }

                var newDifference = Math.abs(target - newResult)

                if (newDifference < difference) { // found closer match
                    // console.log(`newDifference (${newDifference}) < difference (${difference}), result is now: ${newResult}`)
                    result = newResult
                    difference = newDifference
                }
            }
        }

        console.log(result)

        rl.close()
        rl.removeAllListeners()
        return
    }

})