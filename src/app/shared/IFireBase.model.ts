export class IFireBase {
    $key: String;
    _selected: Boolean;
    created: Number;
    updated: Number;
    creator: String; 

    constructor(created: Number, creator: String, updated:Number, id?: String) { 
        if( id ) {
            this.$key = id; 
        }
        this.updated = updated; 
        this.creator = creator; 
        this.created = created;

        this._selected = false;
    }
}