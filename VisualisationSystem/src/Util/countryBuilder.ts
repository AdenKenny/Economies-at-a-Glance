; "use strict";

import Country from "./country";

class CountryBuilder {

    static notToCapitalise = ["the", "of", "and"]; // We don't want to capitalise these words.

    private buildName: string | null;
    private buildAlternativeName: string;
    private buildRegion: string;
    private buildBudget: { expenditure: string, revenue: string };
    private buildGdpBySector: { agriculture: string, industry: string, services: string };
    private buildGini: { years: Map<string, string>, rank: string };
    private buildGrowthRate: { years: Map<string, string>, rank: string };
    private buildHouseholdIncome: { top: string, bottom: string };
    private buildInflation: { years: Map<string, string>, rank: string };
    private buildLabourForce: { rank: string, size: string, occupations: Map<string, string> };
    private buildPopulation: { total: string, rank: string };
    private buildPopulationPovertyLine: string;
    private buildPpp: { years: Map<string, string>, rank: string };
    private buildPublicDebt: { years: Map<string, string>, rank: string };
    private buildSavings: { years: Map<string, string>, rank: string };
    private buildUnemployment: { years: Map<string, string>, rank: string };

    private name: string;
    private alternativeName: string;
    private region: string;
    private budget: { expenditure: number, revenue: number };
    private gdpBySector: { industries: Map<string, number>, rank: number };
    private gini: { years: Map<string, number>, rank: number };
    private growthRate: { years: Map<string, number>, rank: number };
    private householdIncome: { top: number, bottom: number };
    private inflation: { years: Map<string, number>, rank: string };
    private labourForce: { rank: number, size: number, occupations: Map<string, number> };
    private population: { total: number, rank: number };
    private populationBelowPovertyLine: string;
    private ppp: { years: Map<string, number>, rank: number };
    private publicDebt: { years: Map<string, number>, rank: number };
    private savings: { years: Map<string, number>, rank: number };
    private unemployment: { years: Map<string, number>, rank: number };

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
        this.alternativeName = this.cleanupName(this.buildName);
        this.region = this.cleanupName(this.buildRegion);

        try {
            this.budget = {
                expenditure: this.strToNumber(this.buildBudget.expenditure),
                revenue: this.strToNumber(this.buildBudget.revenue)
            };
        }

        catch (error) {

        }


        console.log(this);
        return new Country(this);
    }

    strToNumber = (str: string): number => {

        if (str !== undefined) {
            if (str.indexOf('.') > -1) { // We need to parse this to a float.

                const float = Number.parseFloat(str);

                return (Math.round(float * 100) / 100);
            }

            else {
                return Number.parseInt(str);
            }
        }

        return NaN;
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

    public get $gdpBySector(): { industries: Map<string, number>, rank: number } {
        return this.gdpBySector;
    }

    public get $gini(): { years: Map<string, number>, rank: number } {
        return this.gini;
    }

    public get $growthRate(): { years: Map<string, number>, rank: number } {
        return this.growthRate;
    }

    public get $householdIncome(): { top: number, bottom: number } {
        return this.householdIncome;
    }

    public get $inflation(): { years: Map<string, number>, rank: string } {
        return this.inflation;
    }

    public get $labourForce(): { rank: number, size: number, occupations: Map<string, number> } {
        return this.labourForce;
    }

    public get $population(): { total: number, rank: number } {
        return this.population;
    }

    public get $populationBelowPovertyLine(): string {
        return this.populationBelowPovertyLine;
    }

    public get $ppp(): { years: Map<string, number>, rank: number } {
        return this.ppp;
    }

    public get $publicDebt(): { years: Map<string, number>, rank: number } {
        return this.publicDebt;
    }

    public get $savings(): { years: Map<string, number>, rank: number } {
        return this.savings;
    }

    public get $unemployment(): { years: Map<string, number>, rank: number } {
        return this.unemployment;
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
}

export default CountryBuilder;