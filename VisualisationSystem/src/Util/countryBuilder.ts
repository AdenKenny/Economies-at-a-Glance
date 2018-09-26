import Country from "./country";

;"use strict";

class CountryBuilder {
    private buildAlternativeName: string;
    private buildRegion: string;
    private buildBudget: {expenditure: string, revenue: string};
    private buildGdpBySector: {agriculture: string, industry: string, services: string};
    private buildGini: {years: Map<string, string>, rank: string};
    private buildGrowthRate: {years: Map<string, string>, rank: string};
    private buildHouseholdIncome: {top: string, bottom: string};
    private buildInflation: {years: Map<string, string>, rank: string};
    private buildLabourForce: {rank: string, size: string, occupations: Map<string, string>};
    private buildPopulation: {total: string, rank: string};
    private buildPpp: {years: Map<string, string>, rank: string};
    private buildPublicDebt: {years: Map<string, string>, rank: string};
    private buildSavings: {years: Map<string, string>, rank: string};
    private buildUnemployment: {years: Map<string, string>, rank: string};

    private alternativeName: string;
    private region: string;
    private budget: {expenditure: number, revenue: number};
    private gdpBySector: {industries: Map<string, number>, rank: number};
    private gini: {years: Map<string, number>, rank: number};
    private growthRate: {years: Map<string, number>, rank: number};
    private householdIncome: {top: number, bottom: number};
    private inflation: {years: Map<string, number>, rank: string};
    private labourForce: {rank: number, size: number, occupations: Map<string, number>};
    private population: {total: number, rank: number};
    private ppp: {years: Map<string, number>, rank: number};
    private publicDebt: {years: Map<string, number>, rank: number};
    private savings: {years: Map<string, number>, rank: number};
    private unemployment: {years: Map<string, number>, rank: number};

    constructor(rawName: string | null, data: {}) {
       
    }

    build(): Country {
        return new Country(this);
    }
}

export default CountryBuilder;