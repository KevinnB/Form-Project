import { KeyValue } from '../shared/KeyValue.model';
import { IFireBase } from '../shared/IFireBase.model';
import { Status } from '../status/status.model';

export class Form extends IFireBase{
    name: String;
    status: Number;
    _statusHR: String;
    creator: String;
    dueDate: Number;
    Groups: Array<KeyValue>;
    externalEndpoint: Object;

    constructor(name:String, created:Number, creator:String, updated:Number, dueDate?: Number, id?:String, status?: Status) {
        super(created, creator, updated,  id);
        this.status = status || Status.Created;
        this._statusHR = Status[status] || Status[1];
        this.name = name;
        
        this.dueDate = dueDate;
    }
}