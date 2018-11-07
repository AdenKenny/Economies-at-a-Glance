;
"use strict";

import * as React from "react";
import { Component } from 'react';
import Select from 'react-select';
import "./NavBar.css";


class NavBar extends Component<{changeValue: any, changeView: any}, {isMap}> {

    // private yearOptions = [
    //     { value: '2016', label: '2016' },
    //     { value: '2015', label: '2015' },
    //     { value: '2014', label: '2014' }
    // ];
    
    private indicatorOptions = [
        [{ value: 'ppp', label: 'Purchasing Power Parity' }, true],
        [{ value: 'unemploymentAbsolute', label: 'Unemployment Rate (%)' }, true],
        [{ value: 'unemploymentRank', label: 'Unemployment Rate (Rank)' }, false],
        [{ value: 'inflationRank', label: 'Inflation Rate (Rank)' }, false],
        [{ value: 'inflationAbsolute', label: 'Inflation Rate (%)' }, true]
    ];
    
    private viewOptions = [
        { value: 'Map', label: 'Map View' },
        { value: 'Graph', label: 'Graph View' }     
    ];

    private mapIndicators;
    private graphIndicators;
    
    constructor(props) {
        super(props);
        this.mapIndicators = [];
        this.graphIndicators = [];
        this.indicatorOptions.forEach(indicator => {
            this.mapIndicators.push(indicator[0]);
            if (indicator[1]) {
                this.graphIndicators.push(indicator[0]);
            }
        });

        this.state = {
            isMap: true
        };
    }

    render() {
        const indicators = this.state.isMap ? this.mapIndicators : this.graphIndicators;
        return(
            <div className="selectDiv">
                <Select className="select" placeholder="Select Value" options={indicators} onChange={(val) => this.props.changeValue(val)} />
                <Select className="select" placeholder="Select View" options={this.viewOptions} onChange={(val: { value: string, label: string }) => this.props.changeView(val)} />
            </div>
        );
    }
}

export default NavBar;
