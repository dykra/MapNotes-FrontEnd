import { PinData } from '../api/PinData';
import { Filter } from './Filter';
import { TextFilterType } from './TextFilterType';

export class SearchFilter implements Filter {

    private filter: TextFilterType;

    constructor(filter: TextFilterType) {
        this.filter = filter;
    }

    doFilter(pin: PinData): boolean {
        return pin.data.attributes.keys.some((key: any) =>
            this.filter.checkValue(key) || this.filter.checkValue(pin.data.attributes[key]));
    }
}
