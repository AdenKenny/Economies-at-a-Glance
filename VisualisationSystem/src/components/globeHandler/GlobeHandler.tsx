;
"use strict";

import * as React from "react";
import { Component } from 'react';

import Globe from "../globe/Globe";
import App from "../../App";
import MapScale from "../MapScale/MapScale";

import "./GlobeHandler.css";
import DataHandler from "src/util/dataHandler";
import ZoomButton from "../ZoomButton/ZoomButton";
import { Button } from "@material-ui/core";
import DirectionButton from "../DirectionButton/DirectionButton";

class GlobeHandler extends Component<{ indicator: string }> {

    private abrevToCountry = {};

    zoomInF: () => void;
    zoomOutF: () => void;
    zoomResetF: () => void;
    panF: (x: number, y: number) => void;
    
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

    zoomIn = (): void => {
        this.zoomInF();
    }

    zoomOut = (): void => {
        this.zoomOutF();
    }

    resetZoom = (): void => {
        this.zoomResetF();
    }

    pan = (x: number, y: number): void => {
        this.panF(x, y);
    }

    render() {
        const dataHandler: DataHandler = App.dataHandler;
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
            <div className="flexContainer">
                <div className="sideFlexContainer">
                    <div className="zoomButtonContainer">
                        <ZoomButton onClick={this.zoomIn} text="Zoom In"> </ZoomButton>
                        <ZoomButton onClick={this.zoomOut} text="Zoom Out"> </ZoomButton>
                        <ZoomButton onClick={this.resetZoom} text="Reset Zoom"> </ZoomButton>
                    </div>
                    <div> 
                        <DirectionButton text="↑" x={500} y={0}> </DirectionButton>
                        <DirectionButton text="↓" x={500} y={0}> </DirectionButton>
                        <DirectionButton text="←" x={500} y={0}> </DirectionButton>
                        <DirectionButton text="→" x={500} y={0}> </DirectionButton>

                    </div>
                </div>
                <div>
                    <div className="globe">   
                        <Globe data={data} globeHandler={this}/>
                    </div>
                    <div className="scaleKeysBox">
                        <MapScale data={scaleKeys}/>
                    </div>
                </div>
            </div>
        );

    }

}

export default GlobeHandler;
