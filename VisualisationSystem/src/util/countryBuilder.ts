; 
"use strict";

import Country from "./country";

class CountryBuilder {

    static notToCapitalise = ["the", "of", "and"]; // We don't want to capitalise these words.

    private buildName: string | null;
    private buildAlternativeName: string;
    private buildRegion: string;
    private buildBudget: { expenditure: number, revenue: number };
    private buildGdpBySector: { agriculture: string, industry: string, services: string };
    private buildGini: { years: Map<string, string>, rank: number };
    private buildGrowthRate: { years: Map<string, number>, rank: number };
    private buildHouseholdIncome: { highest_10: number, lowest_10: number };
    private buildInflation: { years: Map<string, string>, rank: string };
    private buildLabourForce: { global_rank: number, total_people: number, by_occupation: Map<string, number> };
    private buildPopulation: { total: number, global_rank: number };
    private buildPopulationPovertyLine: number;
    private buildPpp: { years: Map<string, number>, rank: number };
    private buildPublicDebt: { years: Map<string, string>, rank: string };
    private buildSavings: { years: Map<string, string>, rank: string };
    private buildUnemployment: { years: Map<string, string>, rank: string };

    private name: string;
    private alternativeName: string;
    private region: string;
    private budget: { expenditure: number, revenue: number };
    private gdpBySector: { industries: Map<string, number>};
    private gini: { years: Map<number, number>, rank: number };
    private growthRate: { years: Map<number, number>, rank: number };
    private householdIncome: { top: number, bottom: number };
    private inflation: { years: Map<number, number>, rank: number };
    private labourForce: { rank: number, size: number, occupations: Map<string, number> };
    private population: { total: number, rank: number };
    private populationBelowPovertyLine: number;
    private ppp: { years: Map<number, number>, rank: number };
    private publicDebt: { years: Map<number, number>, rank: number };
    private savings: { years: Map<number, number>, rank: number };
    private unemployment: { years: Map<number, number>, rank: number };

    constructor(rawName: string | null, rawData: any) {

        const data = rawData.data;

        this.buildName = rawName;
        this.buildAlternativeName = rawData.name;
        this.buildRegion = rawData.region;
        this.buildBudget = data.budget;
        this.buildGdpBySector = data.gdp_by_sector;
        this.buildGini = data.gini;
        this.buildGrowthRate = data.growth_rate;
        this.buildHouseholdIncome = data.household_income_by_percentage_share;
        this.buildInflation = data.inflation;
        this.buildLabourForce = data.labor_force;
        this.buildPopulation = data.population;
        this.buildPopulationPovertyLine = data.population_below_poverty_line;
        this.buildPpp = data.ppp;
        this.buildPublicDebt = data.public_debt;
        this.buildSavings = data.savings;
        this.buildUnemployment = data.unemployment;
    }

    build(): Country {

        this.name = this.cleanupName(this.buildName);
        this.alternativeName = this.cleanupName(this.buildAlternativeName);
        this.region = this.cleanupName(this.buildRegion);

        this.mTry(() => {
            if (this.buildBudget !== undefined) {
                this.budget = {
                    expenditure: this.buildBudget.expenditure,
                    revenue: this.buildBudget.revenue
                };    
            }
        });

        this.mTry(() => {
            this.population = {
                total: this.buildPopulation.total,
                rank: this.buildPopulation.global_rank
            };
        });

        this.mTry(() => {
            this.populationBelowPovertyLine = this.buildPopulationPovertyLine;
        });

        this.mTry(() => {
            if (this.buildGini !== undefined) {
                this.gini = this.getYears(this.buildGini);
            }
        });

        this.mTry(() => {
            if (this.buildPpp !== undefined) {
                this.ppp = this.getYears(this.buildPpp);
            }
        });

        this.mTry(() => {
            if (this.buildSavings !== undefined) {
                this.savings = this.getYears(this.buildSavings);
            }
        });

        this.mTry(() => {
            if (this.buildUnemployment !== undefined) {
                this.unemployment = this.getYears(this.buildUnemployment);
            }
        });

        this.mTry(() => {
            if (this.buildPublicDebt !== undefined) {
                this.publicDebt = this.getYears(this.buildPublicDebt);
            }
        });

        this.mTry(() => {
            if (this.buildInflation !== undefined) {
                this.inflation = this.getYears(this.buildInflation);
            }
        });
        
        this.mTry(() => {
            if (this.buildGrowthRate !== undefined) {
                this.growthRate = this.getYears(this.buildGrowthRate);
            }
        });

        this.mTry(() => {
            if (this.buildHouseholdIncome !== undefined) {
                this.householdIncome = {
                    top: this.buildHouseholdIncome.highest_10,
                    bottom: this.buildHouseholdIncome.lowest_10
                };
            }
        });

        this.mTry(() => {
            if (this.buildGdpBySector !== undefined) {
                
                const map: Map<string, number> = new Map<string, number>();

                map["agriculture"] = this.buildGdpBySector.agriculture;
                map["industry"] = this.buildGdpBySector.industry;
                map["services"] = this.buildGdpBySector.services;

                this.gdpBySector = {
                    industries: map
                };
            }
        });

        this.mTry(() => {
            if (this.buildLabourForce !== undefined) {

                const map = new Map<string, number>();

                map["agriculture"] = this.buildLabourForce.by_occupation["agriculture"];
                map["industry"] = this.buildLabourForce.by_occupation["industry"];
                map["services"] = this.buildLabourForce.by_occupation["services"];

                this.labourForce = {
                    rank: this.buildLabourForce.global_rank,
                    size: this.buildLabourForce.total_people,
                    occupations: map
                };
            }
        });
        return new Country(this);
    }

    private getYears = (property: any): {rank: number, years: Map<number, number>} => {
        const obj = {
            rank:  property.rank,
            years: new Map()
        };

        const keys: string[] = Object.keys(property);

        const mapOfVals: Map<number, number> = new Map<number, number>();

        keys.forEach(k => {
            if (k !== "rank") {
                mapOfVals.set(Number.parseInt(k), property[k]);
            }
        });

        obj.years = mapOfVals;
        
        return obj;
    }

    private mTry = (func: () => void): void => {
        try {
            return func();
        }

        catch (error) {
            //console.log(error);
        }
    }

    private strToNumber = (str: string): number => {

        if (str !== undefined) {
            if (str.indexOf('.') > -1) { // We need to parse this to a float.

                const float: number = Number.parseFloat(str);

                return (Math.round(float * 100) / 100);
            }

            else {
                return Number.parseInt(str);
            }
        }

        return NaN;
    }

    private cleanupName = (rawName: string | null): string => {
        let name: string = "";

        if (rawName !== null) {
            const nameArr: string[] = rawName.split("_");

            nameArr.forEach(e => {
                if (!(CountryBuilder.notToCapitalise.indexOf(e) > 1)) {
                    name += e.charAt(0).toUpperCase() + e.slice(1);
                }

                else {
                    name += e;
                }

                name += " ";
            });
        }

        return name.trim();
    }


    public get $name(): string {
        return this.name;
    }

    public get $alternativeName(): string {
        return this.alternativeName;
    }

    public get $region(): string {
        return this.region;
    }

    public get $budget(): { expenditure: number, revenue: number } {
        return this.budget;
    }

    public get $gdpBySector(): { industries: Map<string, number>} {
        return this.gdpBySector;
    }

    public get $gini(): { years: Map<number, number>, rank: number } {
        return this.gini;
    }

    public get $growthRate(): { years: Map<number, number>, rank: number } {
        return this.growthRate;
    }

    public get $householdIncome(): { top: number, bottom: number } {
        return this.householdIncome;
    }

    public get $inflation(): { years: Map<number, number>, rank: number } {
        return this.inflation;
    }

    public get $labourForce(): { rank: number, size: number, occupations: Map<string, number> } {
        return this.labourForce;
    }

    public get $population(): { total: number, rank: number } {
        return this.population;
    }

    public get $populationBelowPovertyLine(): number {
        return this.populationBelowPovertyLine;
    }

    public get $ppp(): { years: Map<number, number>, rank: number } {
        return this.ppp;
    }

    public get $publicDebt(): { years: Map<number, number>, rank: number } {
        return this.publicDebt;
    }

    public get $savings(): { years: Map<number, number>, rank: number } {
        return this.savings;
    }

    public get $unemployment(): { years: Map<number, number>, rank: number } {
        return this.unemployment;
    }
}

export default CountryBuilder;