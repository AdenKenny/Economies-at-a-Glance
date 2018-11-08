;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../../modules/DatabaseModule";
import GlobeHandler from "../../components/globeHandler/GlobeHandler";
import CountryInfo from "../countryInfo/CountryInfo";
import Country from "../../util/country";

export default class Help extends Component<{}> {

    constructor(props) {


        super(props);

        // this.state = {
        //     countryView: <GlobeHandler indicator={this.props.indicator} changeView = {this.changeView} />,
        // }
    }

    render() {
        return (
            <div/>
            // <ContentSlide>
            //     <h1>A simple slide</h1>
            //     <p>Slides can contain multiple steps.</p>
            //     <ul>
            //         <Step index={1} exact><li>Sub-text can appear only for a specific step</li></Step>
            //         <Step index={2}><li>Or it can be additive</li></Step>
            //         <Step index={3}><li>(By default it is additive)</li></Step>
            //         <Step index={4} maxIndex={5}><li>They can also be shown for a range</li></Step>
            //     </ul>
            // </ContentSlide>
        );
    }


}