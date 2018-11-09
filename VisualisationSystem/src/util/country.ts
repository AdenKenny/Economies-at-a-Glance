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
    private labourForce: { agriculture: number, industry: number, services: number }
    private population: { total: number, rank: number };
    private populationBelowPovertyLine: { percent: number };
    private ppp: { years: Map<number, number>, rank: number };
    private pppPerCapita: { value: number };
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

        const labourForce = builder.$labourForce;
        if (labourForce === undefined) {
            this.labourForce = {
                agriculture: undefined,
                industry: undefined,
                services: undefined
            }
        }
        else {
            this.labourForce = {
                agriculture: labourForce.occupations.get("agriculture"),
                industry: labourForce.occupations.get("industry"),
                services: labourForce.occupations.get("services")
            }
        }

        this.population = builder.$population;
        this.populationBelowPovertyLine = { percent: builder.$populationBelowPovertyLine };
        this.ppp = builder.$ppp;

        if (this.ppp !== undefined && this.population !== undefined && this.population.total !== undefined) {
            const years = this.ppp.years;
            let ppp;
            for (let i = 2017; i >= 1992; i--) {
                ppp = years.get(i);
                if (ppp !== undefined) {
                    break;
                }
            }
            if (ppp === undefined) {
                this.pppPerCapita = undefined;
            }
            else {
                this.pppPerCapita = { value: Math.round(ppp / this.population.total) };
            }
        }

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

    public get $labourForce(): { agriculture: number, industry: number, services: number } {
        return this.labourForce;
    }

    public get $population(): { total: number, rank: number } {
        return this.population;
    }

    public get $populationBelowPovertyLine(): { percent: number } {
        return this.populationBelowPovertyLine;
    }

    public get $ppp(): { years: Map<number, number>, rank: number } {
        return this.ppp;
    }

    public get $pppPerCapita(): { value: number } {
        return this.pppPerCapita;
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