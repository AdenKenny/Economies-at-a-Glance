;
"use strict";

import * as React from "react";
import { Component } from 'react';
import Select from 'react-select';
import "./NavBar.css";
import Button from "@material-ui/core/Button";


class NavBar extends Component<{ changeValue: any, changeView: any, toggleHelp: any }, { isMap: boolean, isHelp: boolean }> {

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
            isMap: true,
            isHelp: false
        };

    }

    render() {
        const indicators = this.state.isMap ? this.mapIndicators : this.graphIndicators;
        return (
            <div className="selectDiv">
                <Select className="select" placeholder="Select View" isDisabled={this.state.isHelp} options={this.viewOptions} onChange={(val: { value: string, label: string }) => this.props.changeView(val)} />
                <Select className="select" placeholder="Select Indicator" isDisabled={this.state.isHelp} options={indicators} onChange={(val) => this.props.changeValue(val)} />
                <Button variant="contained" color="primary" onClick={() => {
                    this.props.toggleHelp(!this.state.isHelp);
                    this.setState({
                        isHelp: !this.state.isHelp

                    });
                    
                }}>{this.state.isHelp ? "Close Help": "Show Help"}</Button>
            </div>
        );
    }
}

export default NavBar;
