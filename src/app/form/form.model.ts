import { KeyValue } from '../shared/KeyValue.model';

export class Form{
    id: String;
    name: String;
    status: Number;
    created: Date;
    creator: String;
    dueDate: Date;
    Groups: Array<KeyValue>;
    externalEndpoint: Object;

    constructor(id:String, name:String, created:Date, creator:String, dueDate?: Date) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.creator = creator; 
        this.dueDate = dueDate;
    }
}