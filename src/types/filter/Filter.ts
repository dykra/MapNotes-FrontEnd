import { PinData } from '../PinData';

export interface Filter {
    doFilter(pin: PinData): boolean;
}
