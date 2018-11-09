;
"use strict";

import * as React from "react";
import { Component } from 'react';
import Select from 'react-select';
import "./NavBar.css";
import Button from "@material-ui/core/Button";

import App from '../../App';

class NavBar extends Component<{changeValue: any, changeView: any, toggleHelp: any }, { isMap: boolean, isHelp: boolean }> {

    constructor(props) {
        super(props);

        this.state = {
            isMap: true,
            isHelp: false
        };

    }

    changeView = () => {

        if (this.state.isMap) {
            this.props.changeView(
                {
                    value: "Graph",
                    label: "Graph View",
                }
            );

            this.setState(
                {
                    isMap: false,
                }
            );
        }

        else {
            this.props.changeView(
                {
                    value: "Map",
                    label: "Map View",
                }
            );

            this.setState(
                {
                    isMap: true,
                }
            );

        }
    }   

    render() {
        const indicators = this.state.isMap ? App.mapIndicators : App.graphIndicators;
        return (
            <div className="selectDiv">
                <div className="switchButtonContainer"> 
                    <Button variant="contained" color="primary" onClick={this.changeView}> Change View </Button>
                </div>
                <Select className="select" placeholder="PPP By Capita " isDisabled={this.state.isHelp} options={indicators} onChange={(val) => this.props.changeValue(val)} />
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
