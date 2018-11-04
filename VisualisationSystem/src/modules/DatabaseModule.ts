;
"use strict";

import * as firebase from 'firebase';

import Country from '../util/country';
import CountryBuilder from '../util/countryBuilder';

class DatabaseModule {

    private database: firebase.database.Database;

    constructor() {
        const config = { // Our firebase details.
            apiKey: "AIzaSyDF5tfXCgau1auHhTanHsEjO43LZbh8Zj4",
            authDomain: "swen422-a2.firebaseapp.com",
            databaseURL: "https://swen422-a2.firebaseio.com",
            projectId: "swen422-a2",
            storageBucket: "swen422-a2.appspot.com",
            messagingSenderId: "258004501195"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        this.database = firebase.database();
    }


    readFromDb(): Promise<Map<string|null, any>> {
        Object.freeze(CountryBuilder.notToCapitalise);

        const countries: Map<string|null, Country> = new Map();
        
        return this.database.ref().once('value').then(function (snapshot) {
            
            snapshot.forEach(function (country) {
                countries.set(country.key, new CountryBuilder(country.key, country.val()).build());
            });
            return countries;
        }).then((e)=>{return e});
    }

}

export default DatabaseModule;
