;
"use strict";

import * as React from "react";
import { Component } from 'react';

import Globe from "../globe/Globe";
import App from "../../App";
import MapScale from "../MapScale/MapScale";

class GlobeHandler extends Component<{ indicator: string }> {

    private abrevToCountry = {};

    constructor(props) {
        super(props);
    }

    /* Load in the abreveations to associate them with data from the database
        This allows the association of indicators to the countries on the map.
    */
    private loadData = () => {
        const jsonData = require("../../assets/abrevs.json"); // The abrev file.
        const map: Map<string, any> = App.countryData;
        Array.from(map.keys()).forEach(e => {
            const name = map.get(e).$name;
            const res = (jsonData[name]);
            this.abrevToCountry[name] = res; // Set the abrev to a country.
        });
    }

    render() {
        const dataHandler = App.dataHandler;
        const countries = Array.from(App.countryData.values());
        const fields = dataHandler.getFields(countries, this.props.indicator);
        const unrefined = dataHandler.getData(countries, fields);
        const range = dataHandler.getRange(unrefined);
        const steps = dataHandler.getSteps(range);
        const data = dataHandler.allocate(unrefined, steps, fields);

        let scaleKeys = steps.map(step => {
            return Math.round(step).toLocaleString();
        });
        if (!fields.direction) {
            scaleKeys = scaleKeys.reverse(); // Reverse to get the correct scale keys.
        }


        return (
            <div>
                <Globe data={data}> </Globe>
                <MapScale data={scaleKeys}> </MapScale>
            </div>
        );

    }

}

export default GlobeHandler;
