export class KeyValue {
    key: string;
    value?: Boolean;

    constructor(key?: string, value?: boolean) {
        this.key = key;
        this.value = value;
    }
}