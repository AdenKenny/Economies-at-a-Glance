import Country from './country';

export default class DataHandler {

    private abrevToCountry = {};

    constructor(countries) {
        const jsonData = require("../assets/abrevs.json");
        Array.from(countries.keys()).forEach(e => {
            const name = countries.get(e).$name;
            const res = (jsonData[name]);
            this.abrevToCountry[name] = {key: e, name: res};
        });
    }

    getFromAbrev = (abrev) => {
        for (let name in this.abrevToCountry) {
            const value = this.abrevToCountry[name];
            if (value.name === abrev) {
                return value.key;
            }
        }
    }

    getFields = (indicator) => {
        switch (indicator) {
            case "pppPerCapita":
                return {
                    title: "Purchasing Power Parity Per Capita (USD)",
                    name: "$pppPerCapita",
                    field: "value",
                    needsYear: false,
                    direction: true,
                    prefix: '$',
                    suffix: ''
                };

            case "pppAbsolute":
                return {
                    title: "Purchasing Power Parity (USD)",
                    name: "$ppp",
                    field: "years",
                    needsYear: true,
                    direction: true,
                    prefix: '$',
                    suffix: ''
                };

            case "pppRank":
                return {
                    title: "Purchasing Power Parity (Rank)",
                    name: "$ppp",
                    field: "rank",
                    needsYear: false,
                    direction: false,
                    prefix: '#',
                    suffix: ''
                };

            case "householdIncomeTop":
                return {
                    title: "Household Income Share for Top 10% (%)",
                    name: "$householdIncome",
                    field: "top",
                    needsYear: false,
                    direction: false,
                    prefix: '',
                    suffix: '%'
                }

            case "householdIncomeBottom":
                return {
                    title: "Household Income Share for Bottom 10% (%)",
                    name: "$householdIncome",
                    field: "bottom",
                    needsYear: false,
                    direction: true,
                    prefix: '',
                    suffix: '%'
                }

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

            case "budgetExpenditure":
                return {
                    title: "Budget Expenditure (USD)",
                    name: "$budget",
                    field: "expenditure",
                    needsYear: false,
                    direction: true,
                    prefix: '$',
                    suffix: ''
                };

            case "budgetRevenue":
                return {
                    title: "Budget Revenue (USD)",
                    name: "$budget",
                    field: "revenue",
                    needsYear: false,
                    direction: true,
                    prefix: '$',
                    suffix: ''
                };
            
            case "gini":
                return {
                    title: "Gini Coefficient",
                    name: "$gini",
                    field: "years",
                    needsYear: true,
                    direction: false,
                    prefix: '',
                    suffix: ''
                };

            case "populationBelow":
                return {
                    title: "Population Below Poverty Line (%)",
                    name: "$populationBelowPovertyLine",
                    field: "percent",
                    needsYear: false,
                    direction: false,
                    prefix: '',
                    suffix: '%'
                }

            case "growthRateAbsolute":
                return {
                    title: "Growth Rate (%)",
                    name: "$growthRate",
                    field: "years",
                    needsYear: true,
                    direction: true,
                    prefix: '',
                    suffix: '%'
                }

            case "growthRateRank":
                return {
                    title: "Growth Rate (Rank)",
                    name: "$growthRate",
                    field: "rank",
                    needsYear: false,
                    direction: false,
                    prefix: '#',
                    suffix: ''
                }

            case "inAgriculture":
                return {
                    title: "Portion of Workforce in Agriculture (%)",
                    name: "$labourForce",
                    field: "agriculture",
                    needsYear: false,
                    direction: true,
                    prefix: '',
                    suffix: '%'
                }
            
            case "inIndustry":
                return {
                    title: "Portion of Workforce in Industry (%)",
                    name: "$labourForce",
                    field: "industry",
                    needsYear: false,
                    direction: true,
                    prefix: '',
                    suffix: '%'
                }

            case "inServices":
                return {
                    title: "Portion of Workforce in Services (%)",
                    name: "$labourForce",
                    field: "services",
                    needsYear: false,
                    direction: true,
                    prefix: '',
                    suffix: '%'
                }

            case "publicDebtAbsolute":
                return {
                    title: "Public Debt (% of GDP)",
                    name: "$publicDebt",
                    field: "years",
                    needsYear: true,
                    direction: false,
                    prefix: '',
                    suffix: '%'
                }

            case "publicDebtRank":
                return {
                    title: "Public Debt (Rank)",
                    name: "$publicDebt",
                    field: "rank",
                    needsYear: false,
                    direction: true,
                    prefix: '#',
                    suffix: ''
                }
            

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

        for (let i = 2017; i >= 1992; --i) {
            const data = fieldOrMap.get(i);
            
            if (data !== undefined) {
                return data;
            }
        }

        return fieldOrMap.get(2017);
    }

    getRange = (countries: {name: string, value}[]) => {
        let first;
        let i = 0;
        while (first === undefined) {
            first = countries[i].value;
            ++i;
        }
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
                data[this.abrevToCountry[e.name].name] = {
                    name: e.name,
                    value: "No data"
                }
                return;
            }

            const valueString = this.getValueString(val, fields);

            let place;
            for (let i = steps.length - 1; i >= 0; i--) {
                if (val >= steps[i]) {
                    place = fields.direction ? i + 1 : steps.length - i;
                    break;
                }
            }

            data[this.abrevToCountry[e.name].name] = {
                name: e.name,
                value: valueString,
                fillKey: place + ""
            };
        });

        return data;
    }

    getValueString(value, fields) {
        let valueString = value + "";

        let step = 0;

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
        else {
            step = 1;
        }

        let decimal = valueString.search(/\./);
        if (decimal === -1) {
            decimal = valueString.length - 1 + step;
        }

        for (let i = decimal - 3; i > 0; i-=3) {
            valueString = valueString.substring(0, i) + ',' + valueString.substring(i, valueString.length);
        }

        return fields.prefix + valueString + fields.suffix;
    }

    replaceZeroes = (value, number) => {
        return value.length > number && value.substring(value.length - number, value.length).replace(/0/g, '').length === 0;
    }
}