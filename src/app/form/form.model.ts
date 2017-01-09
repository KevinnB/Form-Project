import { KeyValue } from '../shared/KeyValue.model';
import { IFireBase } from '../shared/IFireBase.model';
import { Status } from '../shared/status.model';

export class Form extends IFireBase{
    name: string;
    status: Number;
    _statusHR: string;
    creatorName: string;
    creator: string;
    dueDate: Number;
    Groups: Array<KeyValue>;
    externalEndpoint: Object;

    constructor(name:string, created:Number, creator:string, creatorName:string, updated:Number, dueDate?: Number, id?:string, status?: Status) {
        super(created, creator, creatorName, updated, id);
        this.status = status || Status.Created;
        this._statusHR = Status[status] || Status[1];
        this.name = name;
        
        this.dueDate = dueDate;
    }
}