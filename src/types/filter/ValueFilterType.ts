export enum ValueCheckMode {
    LessEq = 0,
    GraterEq = 1,
    Less = 2,
    Grater = 3,
    NotEq = 4,
    Exactly = 5,
    Part = 6
}

export class ValueFilterType {
    private value: String;
    private mode: ValueCheckMode;

    constructor(value: String, mode: ValueCheckMode) {
        this.value = value;
        this.mode = mode;
    }

    checkValue(value: any): boolean {
        switch (this.mode) {
            // todo all value types
            case ValueCheckMode.Exactly:
                    return value === this.value;
            default:
                return false;
        }
    }
}
