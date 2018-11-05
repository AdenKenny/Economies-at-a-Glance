;
"use strict";

import * as React from "react";
import { Component } from 'react';
import Select from 'react-select';
import "./NavBar.css";


class NavBar extends Component<{changeValue: any, changeView: any}> {

    // private yearOptions = [
    //     { value: '2016', label: '2016' },
    //     { value: '2015', label: '2015' },
    //     { value: '2014', label: '2014' }
    // ];
    
    private indicatorOptions = [
        { value: 'ppp', label: 'Purchasing Power Parity' },
        { value: 'unemploymentAbsolute', label: 'Unemployment Rate (%)' },
        { value: 'unemploymentRank', label: 'Unemployment Rate (Rank)' },
        { value: 'inflationRank', label: 'Inflation Rate (Rank)' },
        { value: 'inflationAbsolute', label: 'Inflation Rate (%)' }
    ];
    
    private viewOptions = [
        { value: 'Map', label: 'Map View' },
        { value: 'Graph', label: 'Graph View' }     
    ];
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="selectDiv">
                <Select className="select" placeholder="Select Value" options={this.indicatorOptions} onChange={(val) => this.props.changeValue(val)} />
                <Select className="select" placeholder="Select View" options={this.viewOptions} onChange={(val: { value: string, label: string }) => this.props.changeView(val)} />
            </div>
        );
    }
}

export default NavBar;
