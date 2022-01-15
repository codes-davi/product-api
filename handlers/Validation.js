class Validation {

    constructor(){
        // eslint-disable-next-line quotes
        throw Error("Can't be instanced");
    }

    static validateProduct = (name, price, description) => {
        return (name && price && description) != undefined &&
            (name.trim() && description.trim()) != '';
    };

    static validateQuery = (page, limit) =>{
        let valid = Boolean((!page && !limit) || (page && limit));
        
        if (!valid) return {valid: false};

        page = page != undefined ? parseInt(page) : page;
        limit = limit != undefined ? parseInt(limit) : limit;
        
        return {data:{page,limit}, valid};
    };

    static offset = (page, limit) =>{
        if (page == 1) {
            return 0;
        } else {
            return (page-1) * limit;
        }
    };

}

module.exports = Validation;