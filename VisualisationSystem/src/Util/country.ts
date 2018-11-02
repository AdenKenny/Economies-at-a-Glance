;
"use strict";

import CountryBuilder from "./countryBuilder";

class Country {
    
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

    constructor(builder: CountryBuilder) {
        this.name = builder.$name;
        this.alternativeName = builder.$alternativeName;
        this.region = builder.$region;
        this.budget = builder.$budget;
        this.gdpBySector = builder.$gdpBySector;
        this.gini = builder.$gini;
        this.growthRate = builder.$growthRate;
        this.householdIncome = builder.$householdIncome;
        this.inflation = builder.$inflation;
        this.labourForce = builder.$labourForce;
        this.population = builder.$population;
        this.populationBelowPovertyLine = builder.$populationBelowPovertyLine;
        this.ppp = builder.$ppp;
        this.publicDebt = builder.$publicDebt;
        this.savings = builder.$savings;
        this.unemployment = builder.$unemployment;
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

export default Country;