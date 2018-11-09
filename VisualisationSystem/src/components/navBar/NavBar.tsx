;
"use strict";

import * as React from "react";
import { Component } from 'react';
import Select from 'react-select';
import "./NavBar.css";
import Button from "@material-ui/core/Button";

import App from '../../App';

class NavBar extends Component<{ changeValue: any, changeView: any, toggleHelp: any }, { isMap: boolean, isHelp: boolean }> {

    private viewOptions = [
        { value: 'Map', label: 'Map View' },
        { value: 'Graph', label: 'Graph View' }
    ];


    constructor(props) {
        super(props);

        this.state = {
            isMap: true,
            isHelp: false
        };

    }

    render() {
        const indicators = this.state.isMap ? App.mapIndicators : App.graphIndicators;
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
