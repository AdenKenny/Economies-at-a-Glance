;
"use strict";

import * as React from "react";
import { Component } from 'react';

import Globe from "../globe/Globe";
import MapScale from "../MapScale/MapScale";
import Country from "../../util/country";
import App from "../../App";

class GlobeHandler extends Component<{ indicator: string }> {

    private abrevToCountry = {};
    private data;

    constructor(props) {
        super(props);
        this.loadData();
    }

    private loadData = () => {
        const jsonData = require("../../assets/abrevs.json");
        const map: Map<string, any> = App.countryData;
        Array.from(map.keys()).forEach(e => {
            const name = map.get(e).$name;
            const res = (jsonData[name]);
            this.abrevToCountry[name] = res;
        });
    }

    setData = () => {

        this.data = {}

        let name: string;
        let field: string;
        let needsYear: boolean;
        let direction: boolean;

        switch (this.props.indicator) {
            case "ppp":
                name = "$ppp";
                field = "years";
                needsYear = true;
                direction = true;
                break;

            case "unemploymentAbsolute":
                name = "$unemployment";
                field = "years";
                needsYear = true;
                direction = false;
                break;

            case "unemploymentRank":
                name = "$unemployment";
                field = "rank";
                needsYear = false;
                direction = false;
                break;

            case "inflationRank":
                name = "$inflation";
                field = "rank";
                needsYear = false;
                direction = false;
                break;

            case "inflationAbsolute":
                name = "$inflation";
                field = "years";
                needsYear = true;
                direction = false;
                break;


            default:
                console.log(this.props.indicator);
        }

        const map: Map<string, any> = App.countryData;

        const albania: number | any = this.getValue(name, field, needsYear, map.get("albania"));
        let min: number = albania;
        let max: number = albania;

        Array.from(map.values()).forEach(e => {

            const val = this.getValue(name, field, needsYear, e);

            if (val === undefined) {
                return;
            }

            if (val > max) {
                max = val;
            }

            if (val < min) {
                min = val;
            }

        });

        const range: number = max - min;
        const numberOfRanges: number = 7;
        const step: number = range / numberOfRanges;
        const steps: number[] = [];

        for (let i = 0; i < numberOfRanges; i++) {
            steps.push(min + step * i);
        }

        Array.from(map.values()).forEach(e => {
            const val = this.getValue(name, field, needsYear, e);

            if (val === undefined) {
                return;
            }

            for (let i = numberOfRanges - 1; i >= 0; i--) {
                if (val > steps[i]) {
                    const place = direction ? i + 1 : numberOfRanges - i;
                    this.data[this.abrevToCountry[e.$name]] = {
                        fillKey: place + ""
                    };
                    break;
                }
            }
        });
    }

    private getValue = (name, field, needsYear, country) => {
        const obj = country[name];

        if (obj === undefined) {
            return undefined;
        }

        const fieldOrMap = obj[field];

        if (!needsYear || fieldOrMap === undefined) {
            return fieldOrMap;
        }

        return fieldOrMap.get(2017);
    }

    render() {
        this.setData();
        return (
            <div>
                <Globe data={this.data}> </Globe>
                <MapScale> </MapScale>
            </div>
        );

    }

}

export default GlobeHandler;
