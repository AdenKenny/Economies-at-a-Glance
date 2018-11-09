import DatabaseModule from '../modules/DatabaseModule';
import { expect } from 'chai';
import 'mocha';

describe('Tests', () => {
    const db: DatabaseModule = new DatabaseModule();
    let countryData: Map<string | null, any>;

    it('true should equal true', () => {
        expect(true).to.equal(true);
    });

    it('data should be empty as no data is loaded', () => {
        expect(countryData).is.undefined;
    });

    it('data should not be empty as data is fully loaded', (done) => {
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
        //console.log(countryData.get('new_zealand'));
        expect(countryData.get('new_zealand').region).to.equal('Oceania');

    });

    it('country New Zealand should have a total revenue of 73,200,000,000', () => {
        expect(countryData.get('new_zealand').budget['revenue']).to.equal(73200000000);

    });

});