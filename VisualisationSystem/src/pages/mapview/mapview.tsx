;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../../modules/DatabaseModule";
import GlobeHandler from "../../components/globeHandler/GlobeHandler";
import CountryInfo from "../countryInfo/CountryInfo";
import Country from "../../util/country";

export default class MapView extends Component<{ indicator: string }, { countryView: any }> {

    constructor(props: Readonly<{ indicator: string }>, state: any) {


        super(props, state);
        this.state = {
            countryView: <GlobeHandler indicator={this.props.indicator} changeView = {this.changeView} />,

        }
        console.log(this);
    }

    render() {
        return (
            <div>
                {this.state.countryView}
            </div>
        );
    }
    
    changeView = (country: string) => {
       this.setState({
           countryView: <CountryInfo country = {country}/>
       })
    }

}