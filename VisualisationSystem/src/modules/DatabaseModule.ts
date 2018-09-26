"use strict";

import * as firebase from 'firebase';

import Country from '../Util/country';
import CountryBuilder from '../Util/countryBuilder';

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


    readFromDb() {
        return this.database.ref().once('value').then(function (snapshot) {
            const countries: Map<string | null, Country> = new Map();
            snapshot.forEach(function (country) {
                countries.set(country.key, new CountryBuilder(country.key, country.val()).build());
            });
            //console.log(countries);
        });
    }

}

export default DatabaseModule;