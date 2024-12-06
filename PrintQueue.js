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

function readData(input){
    //split input rules and page numbers
    const [rulesStr, updatesStr] = input.split("\r\n\r\n");
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
    let sum = 0;

    //loop through each update and pass it to the checkOrder function
    updates.forEach(update =>{
        if (checkCorrectOrder(rules, updates)){
            //if the update does not violate any rules, find middle number at add to sum
            var middle = findMiddle(update);
            sum += middle;
        }
    });

    return sum;
}

fs.readFile('C:/Users/grran/development/AdventOfCode2024/Day5/puzzle.txt', 'utf8', (err,data)=>{
    if (err){
        console.error(err);
        return;
    }
    console.log(readData(data));
});
