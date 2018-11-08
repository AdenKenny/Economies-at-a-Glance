;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../../modules/DatabaseModule";
import GlobeHandler from "../../components/globeHandler/GlobeHandler";
import CountryInfo from "../countryInfo/CountryInfo";
import Country from "../../util/country";

export default class MapView extends Component<{ indicator: string }> {

    constructor(props) {


        super(props);
        
        // this.state = {
        //     countryView: <GlobeHandler indicator={this.props.indicator} changeView = {this.changeView} />,
        // }
    }

    render() {
        return (
            <div>
                <GlobeHandler indicator={this.props.indicator}/>
            </div>
        );
    }
    

}