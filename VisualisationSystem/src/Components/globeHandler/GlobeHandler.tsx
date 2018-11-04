;
"use strict";

import * as React from "react";
import { Component } from 'react';

import Globe from "../globe/Globe";
import HomePage from "../../Pages/Home";
import Country from "../../Util/country";

class GlobeHandler extends Component<{}> {

    private abrevToCountry = {};
    private data;

    constructor(props) {
        super(props);
        this.loadData();
        this.setData();
    }

    private loadData = () => {
        const jsonData = require("../../Assets/abrevs.json");
        const map = HomePage.superData;
        Array.from(map.keys()).forEach(e => {
            const name = map.get(e).$name;
            const res = (jsonData[name]);
            this.abrevToCountry[name] = res;
        });
    }

    setData = () => {
        this.data = this.setRanges("growthRate", "rank", false);

    }

    setRanges = (methodName: string, field: string, direction: boolean) => {

        const data = {}
        
        const name: string = "$" + methodName;

        const map: Map<string, any> = HomePage.superData;

        const albania: number | any = map.get("albania")[name][field];
        let min: number = albania;
        let max: number = albania;

        Array.from(map.values()).forEach(e => {
            
            const obj = e[name];

            if (obj === undefined) {
                return;
            } 
            
            const val = obj[field];
            
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
            const obj = e[name];

            if (obj === undefined) {
                return;
            } 
            const val = obj[field];

            for (let i = numberOfRanges - 1; i >= 0; i--) {
                if (val > steps[i]) {
                    const place = direction ? i + 1 : numberOfRanges - i;
                    data[this.abrevToCountry[e.$name]] = {
                        fillKey: place + ""
                    };
                    
                    break;
                }
            }
        });

        return data;
    }

    render() {
        return ( 
            <div> 
                <Globe data={this.data}> </Globe>
            </div>
        );

    }

}

export default GlobeHandler;
