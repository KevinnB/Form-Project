export class cleansedModel {
    internalModel: Object;

    constructor () {
        this.internalModel = {};
    }

    cleanse(model:Object) {
    var temp = {};
        for (var key in model) {
            // This will verify that the property exists and it isn't "private"
            if(typeof model[key] !== 'undefined' && key.indexOf('_') !== 0 && key.indexOf('$key') !== 0) {
                if(model[key].hasOwnProperty()) {
                    temp[key] = this.cleanse(model[key]);
                } else if (typeof model[key] !== 'function') {
                    temp[key] = model[key];
                }
            }
        }
        return temp;
    } 
}