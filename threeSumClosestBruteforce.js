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
            for (var j = i + 1; j < inputNumbers.length; j++) {
                for (var k = j + 1; k < inputNumbers.length; k++) {
                    var newResult = inputNumbers[i] + inputNumbers[j] + inputNumbers[k]

                    // console.log(`adding numbers ${inputNumbers[i]}, ${inputNumbers[j]}, and ${inputNumbers[k]}`)
                    // console.log(`newResult: ${newResult}`)

                    if (isNaN(newResult)) {
                        // console.log("newResult == NaN") 
                        break
                    }

                    var newDifference = Math.abs(target - newResult)

                    // console.log(`newResult: ${newResult}, newDifference: ${newDifference}`)

                    if (newDifference < difference) {
                        // console.log(`newDifference (${newDifference}) < difference (${difference}), result is now: ${newResult}`)
                        result = newResult
                        difference = newDifference
                    }
                }
            }
        }

        console.log(result)

        rl.close()
        rl.removeAllListeners()
        return
    }

})