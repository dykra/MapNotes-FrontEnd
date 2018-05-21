import { Filter } from './Filter';
import { OrFilter } from './OrFilter';
import { AndFilter } from './AndFilter';
import { AttributeFilter } from './AttributeFilter';
import { TextFilterType } from './TextFilterType';
import { ValueFilterType } from './ValueFilterType';
import { SearchFilter } from './SearchFilter';

function containLessGraterEqual(input: string): boolean {
    return input.includes('<') || input.includes('>') || input.includes('=')
}

function chooseTextMode(text: string): Text {
    const firstPoint = text.indexOf('.');
    if (firstPoint == -1) {
        return Text.Part;
    }
    if (firstPoint != text.length - 1) {
        throw new Error('Znak \'.\' może być użyty tylko na końcu wartości lub atrybutu');
    } else {
        return Text.Exactly;
    }
}

function parseParameter (parameter: string):  Filter {
    parameter = parameter.trim();
    if (containLessGraterEqual(parameter)) {
        throw new Error('Aby użyć operatorów porównania należy podać atrybut danego pola');
    }
    parameter = parameter.replace('.', '').trim();
    return new SearchFilter(new TextFilterType(parameter), chooseTextMode(parameter));
}

function chooseValueMode(text: string): Value {
    //todo
    return Value.Exactly;
}

function parseWithAttributeCondition (condition: string): Filter {
    const attributeValue = condition.split(':');
    if (attributeValue.length !== 2) {
        throw new Error('W danym warunku może być co najwyżej jeden znacznik atrybutu \':\'');
    }
    //todo
    const keyFilter = attributeValue[0];
    const valueFilter = attributeValue[1];
    return new AttributeFilter(new TextFilterType("a"), new ValueFilterType("b"));
}

function parseFilterAndInput (condition: string): Filter {
    if (condition.includes(':')) {
        return parseWithAttributeCondition(condition);
    } else {
        return parseParameter(condition);
    }
}

function parseFilterOrInput (input: string): Filter {
    const splitByAnd: Array<string> = input.split('&');
    return new AndFilter(splitByAnd.map(parseFilterAndInput));
}

export function parseFilterInput (input: string): Filter {
    const splitByOr: Array<string> = input.split('|');
    return new OrFilter(splitByOr.map(parseFilterOrInput));
}