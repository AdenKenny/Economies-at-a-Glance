import Country from './country';

export default class DataHandler {

    private abrevToCountry = {};

    constructor(countries) {
        const jsonData = require("../assets/abrevs.json");
        Array.from(countries.keys()).forEach(e => {
            const name = countries.get(e).$name;
            const res = (jsonData[name]);
            this.abrevToCountry[name] = res;
        });
    }

    getFields = (countries, indicator) => {
        switch (indicator) {
            case "ppp":
                return {
                    name: "$ppp",
                    field: "years",
                    needsYear: true,
                    direction: true
                };

            case "unemploymentAbsolute":
                return {
                    name: "$unemployment",
                    field: "years",
                    needsYear: true,
                    direction: false
                };

            case "unemploymentRank":
                return {
                    name: "$unemployment",
                    field: "rank",
                    needsYear: false,
                    direction: false
                };

            case "inflationRank":
                return {
                    name: "$inflation",
                    field: "rank",
                    needsYear: false,
                    direction: false
                };

            case "inflationAbsolute":
                return {
                    name: "$inflation",
                    field: "years",
                    needsYear: true,
                    direction: false
                };


            default:
                console.log(indicator);
                return undefined;
        }
    }

    getData = (countries: Country[], fields) => {
        const cls = this;
        return countries.map(country => {
            return {
                name: country.$name,
                value: cls.getValue(fields.name, fields.field, fields.needsYear, country)
            };
        });
    }

    getValue = (name, field, needsYear, country) => {
        const obj = country[name];

        if (obj === undefined) {
            return undefined;
        }

        const fieldOrMap = obj[field];

        if (!needsYear || fieldOrMap === undefined) {
            return fieldOrMap;
        }

        return fieldOrMap.get(2017);
    }

    getRange = (countries: {name: string, value}[]) => {
        const first = countries[0].value;
        let min: number = first;
        let max: number = first;

        countries.forEach(e => {

            const val = e.value;

            if (val === undefined) {
                return;
            }

            if (val > max) {
                max = val;
            }

            if (val < min) {
                min = val;
            }

        });

        const range: number = max - min;
        return {
            min: min,
            max: max,
            range: range 
        };
    }

    getSteps = (countries: {name: string, value}[], range, direction) => {
        const data = [];

        const numberOfRanges: number = 7;
        const step: number = range.range / numberOfRanges;
        const steps: number[] = [];

        for (let i = 0; i < numberOfRanges; i++) {
            steps.push(range.min + step * i);
        }

        countries.forEach(e => {
            const val = e.value;

            if (val === undefined) {
                return;
            }

            for (let i = numberOfRanges - 1; i >= 0; i--) {
                if (val > steps[i]) {
                    const place = direction ? i + 1 : numberOfRanges - i;
                    data[this.abrevToCountry[e.name]] = {
                        fillKey: place + ""
                    };
                    break;
                }
            }
        });

        return data;
    }
}