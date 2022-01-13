class Validation {

    constructor(){
        // eslint-disable-next-line quotes
        throw Error("Can't be instanced");
    }

    static validateProduct = (name, price, description) => {
        return (name && price && description) != undefined &&
            (name.trim() && description.trim()) != '';
    };

}

module.exports = Validation;