function parseParameter (parameter: string): Array<string> {
    if (condition.includes("<") || condition.includes(">") || condition.includes("=")) {
        //błąd znak mniejszy/większy/rowny bez atrybutu
    } else if (condition.includes(".")) {
        return parseExactlyCondition(condition.trim())
    } else {
        return parsePieceCondition(condition.trim())
    }
}

function parseWithAttributeCondition (condition: string): Filter {
    const attributeValue = condition.split(":");
    if (attributeValue.length != 2) {
        throw new Error("W danym warunku może być co najwyżej jeden znacznik atrybutu \':\'");
    }
    return AttributeFilter

}

function parseFilterAndInput (condition: string): Filter {

    if (condition.includes(":")) {
        return parseWithAttributeCondition(condition);
    } else {
        return parsePlainCondition(condition);
    }

}

function parseFilterOrInput (input: string): Filter {

    const splitByAnd: Array<string> = input.split("&");
    return AndFilter(splitByAnd.map(parseFilterAndInput));

}

// reserved: ":" "|" "&" "."
function parseFilterInput (input: string): Filter {

    try{
        const splitByOr: Array<string> = input.split("|");
        return OrFilter(splitByOr.map(parseFilterOrInput));
    } catch (error) {
        console.error(error.message);
    }

}