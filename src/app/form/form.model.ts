import { KeyValue } from '../shared/KeyValue.model';
import { IFireBase } from '../shared/IFireBase.model';
import { Status } from '../status/status.model';

export class Form extends IFireBase{
    name: String;
    status: Number;
    statusHR: String;
    created: Number;
    creator: String;
    dueDate: Number;
    Groups: Array<KeyValue>;
    externalEndpoint: Object;

    constructor(name:String, created:Number, creator:String, dueDate?: Number, id?:String, status?: Status) {
        super(id);
        this.status = status || Status.Created;
        this.statusHR = Status[status] || Status[1];
        this.name = name;
        this.created = created;
        this.creator = creator; 
        this.dueDate = dueDate;
    }
}