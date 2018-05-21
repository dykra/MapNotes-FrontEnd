import { Filter } from '../../types/filter/Filter';
import { OrFilter } from '../../types/filter/OrFilter';
import { AndFilter } from '../../types/filter/AndFilter';
import { AttributeFilter } from '../../types/filter/AttributeFilter';
import { TextFilterType } from '../../types/filter/TextFilterType';
import { ValueFilterType } from '../../types/filter/ValueFilterType';
import { SearchFilter } from '../../types/filter/SearchFilter';

function parseParameter (parameter: string):  Filter {
    if (parameter.includes('<') || parameter.includes('>') || parameter.includes('=')) {
        throw new Error('błąd znak mniejszy/większy/rowny bez atrybutu');
    // } else if (parameter.includes('.')) {
    //     return parseExactlyCondition(parameter.trim());
    } else {
        const textFilter =  new TextFilterType(parameter.trim());
        return new SearchFilter(textFilter);
    }
}

function parseWithAttributeCondition (condition: string): Filter {
    const attributeValue = condition.split(':');
    if (attributeValue.length !== 2) {
        throw new Error('W danym warunku może być co najwyżej jeden znacznik atrybutu \':\'');
    }
    const keyFilter = new TextFilterType(attributeValue[0]);
    const valueFilter = new ValueFilterType(attributeValue[0]);
    return new AttributeFilter(keyFilter, valueFilter);

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