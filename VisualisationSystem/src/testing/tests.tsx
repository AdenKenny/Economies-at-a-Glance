import DatabaseModule from '../modules/DatabaseModule';
import { expect } from 'chai';
import 'mocha';

describe('Tests', () => {
    const db: DatabaseModule = new DatabaseModule();
    let countryData: Map<string | null, any>;

    it('true should equal true', () => {
        expect(true).to.equal(true);
    });

    it('data should be empty as no countries are loaded', () => {
        expect(countryData).is.undefined;
    });

    it('data should not be empty as countries are fully loaded', (done) => {
        db.readFromDb().then(country => {
            countryData = country;

            setTimeout( () => {
                done();
            }, 0);
            expect(countryData).length.greaterThan(0);
        });
        
    });

    it('country Angola should be called Angola', () => {
        expect(countryData.get('angola').name).to.equal('Angola');

    });

    it('country Angola should be in continent Africa', () => {
        expect(countryData.get('angola').region).to.equal('Africa');

    });

    it('country Angola should have a total population of 29,310,273', () => {
        expect(countryData.get('angola').population['total']).to.equal(29310273);

    });

    it('country New Zealand should be in continent Oceania', () => {
        expect(countryData.get('new_zealand').region).to.equal('Oceania');

    });

    it('country New Zealand should have a total revenue of 73,200,000,000', () => {
        expect(countryData.get('new_zealand').budget['revenue']).to.equal(73200000000);

    });

    it('country New Zealand should have a Purchasing Power Parity of 188,600,000,000 in 2017', () => {
        expect(countryData.get('new_zealand').ppp['years'].get(2017)).to.equal(188600000000);

    });

    it('country New Zealand should have an Unemployment Rate of 4.9% in 2017', () => {
        expect(countryData.get('new_zealand').unemployment['years'].get(2017)).to.equal(4.9);

    });

    it('country New Zealand should have an Global Unemployment Rank of 72', () => {
        expect(countryData.get('new_zealand').unemployment['rank']).to.equal(72);

    });

    it('country New Zealand should have an Global Inflation Rank of 96', () => {
        expect(countryData.get('new_zealand').inflation['rank']).to.equal(96);

    });

    it('country New Zealand should have an Inflation Rate of 1.9 in 2017', () => {
        expect(countryData.get('new_zealand').inflation['years'].get(2017)).to.equal(1.9);

    });

    it('country New Zealand should have a population greater than four million', () => {
        expect(countryData.get('new_zealand').population['total']).greaterThan(4000000);

    });

});