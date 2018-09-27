import CountryBuilder from "./countryBuilder";

;"use strict";

class Country {
    
    private name: string;
    
    //private region: string;


    constructor(builder: CountryBuilder) {
        
    }

    getName(): string {
        return this.name;
    }
}

export default Country;