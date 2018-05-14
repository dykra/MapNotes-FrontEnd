const MAX_CONDITIONS: number = 10;

function conditionsToArray (input: string, separator: string): Array<string> {
    return input.split(separator, MAX_CONDITIONS - 1)
}



function parseFilterInput (input: string): Array<any> {

    const orConditions: Array<string> = conditionsToArray(input, "|");

    let conditions: Array<Array<string>> = [[]];
    for(let i = 0; i < orConditions.length; i++) {
        conditions.push(conditionsToArray(input, "&"))
    }

    return conditions //wrong!!
}
