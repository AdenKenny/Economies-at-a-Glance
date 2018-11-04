;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../modules/DatabaseModule";
import GlobeHandler from "../components/globeHandler/GlobeHandler";

export default class MapView extends Component<{}> {

     constructor(props: Readonly<{}>) {
         super(props);
    }


    render() {
        return(
            <GlobeHandler/>
        );
    }
}