export class IFireBase {
    $key: string;
    _selected: Boolean;
    created: Number;
    updated: Number;
    creator: string; 

    constructor(created: Number, creator: string, updated:Number, id?: string) { 
        if( id ) {
            this.$key = id; 
        }
        this.updated = updated; 
        this.creator = creator; 
        this.created = created;

        this._selected = false;
    }
}