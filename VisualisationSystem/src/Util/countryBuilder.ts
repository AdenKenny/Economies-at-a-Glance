;"use strict";

class CountryBuilder {
    private buildAlternativeName: string;
    private buildRegion: string;
    private buildBudget: {expenditure: string, revenue: string};
    private buildGdpBySector: {agriculture: string, industry: string, services: string};
    private buildGini: {year: string};
    private buildGrowthRate: {year: string};
}

export default CountryBuilder;