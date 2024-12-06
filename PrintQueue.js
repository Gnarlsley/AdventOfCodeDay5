const fs = require('node:fs');

function checkCorrectOrder(rules, update){
    //process a check for every rule
    for (let i = 0; i < rules.length; i++){
        const [before,after] = rules[i];
        //grab the index where the first number appears
        const beforeIndex = update.indexOf(before);
        //index for when second number appears
        const afterIndex = update.indexOf(after);

        //if one or both of the numbers from the current rule are not found in the update, do not provide a false
        //check that both numbers in the current rule are present in the update and that they violate the rule
        if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex > afterIndex){
            return false;
        }
    }
    return true;
}

function findMiddle(update){
    const midIndex = Math.floor(update.length/2);
    return update[midIndex];
}

function performSwap(update, beforeIndex, afterIndex){
    var temp = update[beforeIndex];
    update[beforeIndex] = update[afterIndex];
    update[afterIndex] = temp;
    return update;
}

function solvePartTwo(input){
    var count = 0;
    var failedUpdates = [];
    const data = parseData(input);
    data[1].forEach(update =>{
        if (!checkCorrectOrder(data[0], update)){
            //process a check for every rule
            for (let i = 0; i < data[0].length; i++){

                const [before,after] = data[0][i];
                //grab the index where the first number appears
                const beforeIndex = update.indexOf(before);
                //index for when second number appears
                const afterIndex = update.indexOf(after);

                //if one or both of the numbers from the current rule are not found in the update, do not provide a false
                //check that both numbers in the current rule are present in the update and that they violate the rule
                if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex > afterIndex){
                    update = performSwap(update, beforeIndex, afterIndex);
                    i = 0;
                }
            }
            failedUpdates.push(update);
        }
    });
    failedUpdates.forEach(update =>{
        if (checkCorrectOrder(data[0], update)){
            const middle = findMiddle(update);
            count += middle;
        }
        else{
            console.log("Fail");
        }
    });
    console.log("Answer for part 2: " + count);
}

function parseData(input){
    //split input rules and page numbers
    const [rulesStr, updatesStr] = input.split("\n\n");
    //split the rules by each rule, then each rule by their numbers
    //10|11
    //12|14
    //appears like [[10,11],[12,14]]
    const rules = rulesStr.split("\n").map(rule => rule.split("|").map(Number));
    //do the same for the updates
    //10,11,12,14
    //10,12,11
    //[[10,11,12,14],[10,12,11]]
    const updates = updatesStr.split("\n").map(update => update.split(",").map(Number));
    return [rules,updates];
}

function solvePartOne(input){
    let sum = 0;
    const data = parseData(input);
    //loop through each update and pass it to the checkOrder function
    data[1].forEach(update =>{
        if (checkCorrectOrder(data[0], update)){
            //if the update does not violate any rules, find middle number at add to sum
            const middle = findMiddle(update);
            sum += middle;
        }
    });

    console.log("Answer for part 1: " + sum);
}

fs.readFile('C:/Users/grran/development/AdventOfCode2024/Day5/puzzle.txt', 'utf8', (err,data)=>{
    if (err){
        console.error(err);
        return;
    }
    solvePartOne(data);
    solvePartTwo(data);
});
