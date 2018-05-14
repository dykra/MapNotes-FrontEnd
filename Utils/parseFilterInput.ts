const MAX_CONDITIONS: number = 10;

function conditionsToArray (input: string, separator: string): Array<string> {
    return input.split(separator, MAX_CONDITIONS - 1)
}

function parseWithAttributeCondition (condition: string): Array<string> {
    const parsed = conditionsToArray(condition, ":")
    if (parsed.length != 2) {
        //błąd zagnieżdżonego atrybutu?
    }
    const attribute: Array<string> = parseParameter(parsed[0])
    const value: Array<string> = parseValue(parsed[1])
}

function parseParameter (parameter: string): Array<string> {
    if (condition.includes("<") || condition.includes(">") || condition.includes("=")) {
        //błąd znak mniejszy/większy/rowny bez atrybutu
    } else if (condition.includes(".")) {
        return parseExactlyCondition(condition.trim())
    } else {
        return parsePieceCondition(condition.trim())
    }
}


// reserved: ":" "|" "&" "."
function parseCondition (condition: string): Array<string> {
    if (condition.includes(":")) {
        return parseWithAttributeCondition(condition)
    } else {
        return parseParameter(condition)
    }
}

function parseFilterInput (input: string): Array<any> {

    const orConditions: Array<string> = conditionsToArray(input, "|");

    let conditions: Array<Array<string>> = [];
    for(let i = 0; i < orConditions.length; i++) {
        conditions.push(conditionsToArray(orConditions[i], "&"))
    }

    let filter: Array<Array<Array<string>>> = [];
    for(let i = 0; i < conditions.length; i++) {
        filter.push([]);
        for(let j = 0;j < conditions[i].length; j++) {
            try {
                filter[i].push(parseCondition(conditions[i][j]))
            } catch (exception) {
                //wrong input
            }
        }
    }

    return filter
}