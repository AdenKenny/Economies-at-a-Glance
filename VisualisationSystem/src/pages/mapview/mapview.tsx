;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../../modules/DatabaseModule";
import GlobeHandler from "../../components/globeHandler/GlobeHandler";

export default class MapView extends Component<{indicator: string}> {

     constructor(props: Readonly<{indicator: string}>) {
        super(props);
    }

    render() {
        return(
            <GlobeHandler indicator={this.props.indicator}/>
        );
    }
}