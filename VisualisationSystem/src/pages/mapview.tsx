;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../modules/DatabaseModule";

export default class MapView extends Component<{}> {

    private db: DatabaseModule;

     constructor(props: Readonly<{ }>) {
         super(props);
    }


    render() {
        return(
            <div>
               {/* <button onClick={this.testData}> Test data </button> */}
            </div>
        );
    }

    testData = () => {
        this.db.readFromDb();
    }
}