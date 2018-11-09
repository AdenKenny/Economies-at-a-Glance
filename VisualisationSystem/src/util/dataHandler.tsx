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
                    title: "Purchasing Power Parity",
                    name: "$ppp",
                    field: "years",
                    needsYear: true,
                    direction: true,
                    prefix: '$',
                    suffix: ''
                };

            case "unemploymentAbsolute":
                return {
                    title: "Unemployment Rate",
                    name: "$unemployment",
                    field: "years",
                    needsYear: true,
                    direction: false,
                    prefix: '',
                    suffix: '%'
                };

            case "unemploymentRank":
                return {
                    title: "Unemployment by World Ranking",
                    name: "$unemployment",
                    field: "rank",
                    needsYear: false,
                    direction: false,
                    prefix: '#',
                    suffix: ''
                };

            case "inflationRank":
                return {
                    title: "Inflation by World Ranking",
                    name: "$inflation",
                    field: "rank",
                    needsYear: false,
                    direction: false,
                    prefix: '#',
                    suffix: ''
                };

            case "inflationAbsolute":
                return {
                    title: "Inflation Rate",
                    name: "$inflation",
                    field: "years",
                    needsYear: true,
                    direction: false,
                    prefix: '',
                    suffix: '%'
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

        for (let i = 2017; i >= 2011; --i) {
            const data = fieldOrMap.get(i);
            
            if (data !== undefined) {
                return data;
            }
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

    getSteps = (range) => {

        const numberOfRanges: number = 7;
        const step: number = range.range / numberOfRanges;
        const steps: number[] = [];

        for (let i = 0; i < numberOfRanges; i++) {
            steps.push(range.min + step * i);
        }
        return steps;
    }

    allocate = (countries: {name: string, value}[], steps, fields) => {
        const data = [];
        countries.forEach(e => {
            const val = e.value;

            if (val === undefined) {
                data[this.abrevToCountry[e.name]] = {
                    name: e.name,
                    value: "No data"
                }
                return;
            }

            let valueString = val + "";

            if (this.replaceZeroes(valueString, 12)) {
                valueString = valueString.substring(0, valueString.length - 12) + 't';
            }
            else if (this.replaceZeroes(valueString, 9)) {
                valueString = valueString.substring(0, valueString.length - 9) + 'b';
            }
            else if (this.replaceZeroes(valueString, 6)) {
                valueString = valueString.substring(0, valueString.length - 6) + 'm';
            }
            else if (this.replaceZeroes(valueString, 3)) {
                valueString = valueString.substring(0, valueString.length - 3) + 'k';
            }

            let decimal = valueString.search(/\./);
            if (decimal === -1) {
                decimal = valueString.length - 1;
            }

            for (let i = decimal - 3; i > 0; i-=3) {
                valueString = valueString.substring(0, i) + ',' + valueString.substring(i, valueString.length);
            }

            valueString = fields.prefix + valueString + fields.suffix;

            for (let i = steps.length - 1; i >= 0; i--) {
                if (val > steps[i]) {
                    const place = fields.direction ? i + 1 : steps.length - i;
                    data[this.abrevToCountry[e.name]] = {
                        name: e.name,
                        value: valueString,
                        fillKey: place + ""
                    };
                    break;
                }
            }
        });

        return data;
    }

    replaceZeroes = (value, number) => {
        return value.length > number && value.substring(value.length - number, value.length).replace(/0/g, '').length === 0;
    }
}