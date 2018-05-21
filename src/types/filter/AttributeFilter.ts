import { PinData } from '../PinData';
import { Filter } from './Filter';
import { TextFilterType } from './TextFilterType';
import { ValueFilterType } from './ValueFilterType';
import { ModeText, ModeValue } from './modes';

export class AttributeFilter implements Filter {

    private keyFilter: TextFilterType;
    private valueFilter: ValueFilterType;

    constructor(keyFilter: TextFilterType, modeKey: ModeText, valueFilter: ValueFilterType, modeValue: ModeValue) {
        this.keyFilter = keyFilter;
        this.valueFilter = valueFilter;
    }

    doFilter(pin: PinData): boolean {
        for (let key of pin.data.attributes) {
            if (this.keyFilter.checkValue(key) && this.valueFilter.checkValue(pin.data.attributes[key])) {
                return true;
            }
        }
        return false;
    }

}