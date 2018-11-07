;
"use strict";

import * as React from "react";
import { Component } from 'react';

import Globe from "../globe/Globe";
import MapScale from "../MapScale/MapScale";
import Country from "../../util/country";
import App from "../../App";

class GlobeHandler extends Component<{ indicator: string }> {

    constructor(props) {
        super(props);
    }

    setData = () => {
    }

    render() {
        const dataHandler = App.dataHandler;
        const countries = Array.from(App.countryData.values());
        const fields = dataHandler.getFields(countries, this.props.indicator);
        const data = dataHandler.getData(countries, fields);
        const range = dataHandler.getRange(data);
        const steps = dataHandler.getSteps(data, range, fields.direction);
        
        return (
            <div>
                <Globe data={steps}> </Globe>
            </div>
        );

    }

}

export default GlobeHandler;
