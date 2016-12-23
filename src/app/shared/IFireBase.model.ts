export class IFireBase {
    $key: String;
    selected: Boolean;

    constructor(id?: String) { 
        if(id) {
            this.$key = id; 
        }
        this.selected = false;
    }
}