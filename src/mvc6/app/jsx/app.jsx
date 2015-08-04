//Write jsx here
//you can use es6 + jsx syntax that babel supports

class View {
    constructor(options) {
        this.model = options.model;
        this.template = options.template;
    }

    render() {
        return _.template(this.template, this.model.toObject());
    }
}