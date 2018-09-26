import CountryBuilder from "./countryBuilder";

;"use strict";

class Country {
    
    private name: string;
    
    //private region: string;

    protected static notToCapitalise = ["the", "of", "and"]; // We don't want to capitalise these words.

    constructor(builder: CountryBuilder) {
        
    }

    // constructor(rawName: string | null, data: {}) {

    //     console.log(data);

    //     if (rawName !== null) {
    //         const nameArr: string[] = rawName.split("_");
                   
    //         let str: string = "";

    //         nameArr.forEach(e => {
    //             if (!(Country.notToCapitalise.indexOf(e) > 1)) {
    //                 str += e.charAt(0).toUpperCase() + e.slice(1);
    //             }

    //             else {
    //                 str += e;
    //             }

    //             str += " ";
    //         });

    //         //console.log(str);
    //     }
    // }

    getName(): string {
        return this.name;
    }
}

export default Country;