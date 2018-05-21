import { PinData } from '../PinData';
import { Filter } from './Filter';
import { TextFilterType } from './TextFilterType';

export class SearchFilter implements Filter {

    private filter: TextFilterType;

    constructor(filter: TextFilterType) {
        this.filter = filter;
    }

    doFilter(pin: PinData): boolean {
        for (let key of pin.data.attributes) {
            if (this.filter.checkValue(key) || this.filter.checkValue(pin.data.attributes[key])) {
                return true;
            }
        }
        return false;
    }

}
