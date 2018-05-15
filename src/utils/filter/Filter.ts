import {PinData} from "../../types/PinData";

interface Filter{
    doFilter(pin: PinData): boolean;
}

class OrFilter implements Filter{

    private filters: Filter[];

    constructor(filters: Filter[]){
        this.filters=filters;
    }

    doFilter(pin: PinData): boolean {
        //todo
        return false;
    }

}

class AndFilter implements Filter {

    private filters: Filter[];

    constructor(filters: Filter[]) {
        this.filters = filters;
    }

    doFilter(pin: PinData): boolean {
        //todo
        return false;
    }

}

interface A {

}

interface B {

}

class SearchFilter implements Filter{

    private value: A;

    constructor(value: A){
        this.value = value;
    }

    doFilter(pin: PinData): boolean {
        //todo
        return false;
    }

}

class AttributeFilter implements Filter{

    private key: A;
    private value: B;

    constructor(key:A, value:B){
        this.key=key;
        this.value = value;
    }

    doFilter(pin: PinData): boolean {
        //todo
        return false;
    }

}