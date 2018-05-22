export class TextFilterType {
    value: String;

    constructor(value: String) {
        this.value = value;
    }

    checkValue(value: any): boolean {
        return value === this.value;
    }
}