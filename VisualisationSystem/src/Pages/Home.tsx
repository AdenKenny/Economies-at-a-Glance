;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../Modules/DatabaseModule";
import BarChart from '../Components/BarChart';

export default class Home extends Component<{db: DatabaseModule}, any> {

    private db: DatabaseModule;
    private superData = new Map<string|null, any>();


    constructor(props: Readonly<{db: DatabaseModule}>) {
        super(props);
        this.db = this.props.db;

        this.state = {
            dataLoaded: false
        };
    }

    private dataLoaded = () => {
        this.setState(
            {
                dataLoaded: true
            }
        );
    }

    render() {
        this.db.readFromDb().then(Country => {
            this.superData = Country;
        }).then(() => {
            this.dataLoaded();
        });

        return(
            <div id="main">
               <button onClick={this.testData}> Test data </button>
               {

                    this.state.dataLoaded?
                    <BarChart db={this.superData}></BarChart>
               :
               <div></div>
            }

            </div>
        ); 

    }

    testData = () => {
        console.log(this.superData.get('new_zealand'));
        console.log(this.superData.get('new_zealand').growthRate);
        console.log(this.superData.get('new_zealand').growthRate.years);
        console.log(this.superData.get('new_zealand').growthRate.years[2015]);

    }
}