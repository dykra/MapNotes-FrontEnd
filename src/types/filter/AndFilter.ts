import { PinData } from '../PinData';
import { Filter } from './Filter';

export class AndFilter implements Filter {

    private filters: Filter[];

    constructor(filters: Filter[]) {
        this.filters = filters;
    }

    doFilter(pin: PinData): boolean {
        for (let filter of this.filters) {
            if (!filter.doFilter(pin)) {
                return false;
            }
        }
        return true;
    }

}