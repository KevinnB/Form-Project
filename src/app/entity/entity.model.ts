import { KeyValue } from '../shared/KeyValue.model';
import { IFireBase } from '../shared/IFireBase.model';
import { Status } from '../shared/status.model';

export class Entity extends IFireBase{
    height: string;
    labelName: string;
    propName: string;
    type: string;
    toolId: number;
    value?: string;
    _validation: Object;

    constructor(created:Number, creator:string, creatorName:string, updated:Number, height:string, labelName:string,propName:string, type:string, toolId:number, value?:string, id?:string) {
        super(created, creator, creatorName, updated, id);
        this.height = height;
        this.labelName = labelName,
        this.propName = propName;
        this.type=type;
        this.toolId = toolId;
        this.value=value;
    }
}