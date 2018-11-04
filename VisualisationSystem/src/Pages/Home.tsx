;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../Modules/DatabaseModule";
import BarChart from '../Components/BarChart';
import Globe from '../Components/globe/Globe';
import GlobeHandler from '../Components/globeHandler/GlobeHandler';


export default class Home extends Component<{db: DatabaseModule}, any> {

    private db: DatabaseModule;
    public static superData = new Map<string|null, any>();

    constructor(props: Readonly<{db: DatabaseModule}>) {
        super(props);
        this.db = this.props.db;

        this.state = {
            dataLoaded: false
        };
    }

    shouldComponentUpdate() {
        if (this.state.dataLoaded) {
            return false;
        }

        return true;
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
            Home.superData = Country;
        }).then(() => {
            this.dataLoaded();
        });

        return(
            <div id="main">
               {
                    this.state.dataLoaded?
                    <GlobeHandler></GlobeHandler>
               :
               <div></div>
            }

            </div>
        ); 

    }

}