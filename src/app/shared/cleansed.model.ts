export class cleansedModel {
    internalModel: Object;

    constructor () {
        this.internalModel = {};
    }

    cleanse(model:Object) {
    var temp = {};
        for (var key in model) {
            // This will verify that the property exists and it isn't "private"
            if(typeof model[key] !== 'undefined' && key.indexOf('_') === 0) {
                if(model[key].hasOwnProperty()) {
                    console.debug(key + 'Property is object');
                    temp[key] = this.cleanse(model[key]);
                } else if (typeof model[key] !== 'function') {
                    console.debug(key + 'Property is valued' + model[key]);
                    temp[key] = model[key];
                }
            }
        }
        return temp;
    } 
}