;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../modules/DatabaseModule";

export default class Home extends Component<{db: DatabaseModule}> {

    private db: DatabaseModule;

     constructor(props: Readonly<{ db: DatabaseModule; }>) {
         super(props);
         this.db = this.props.db;
    }


    render() {
        return(
            <div>
               <button onClick={this.testData}> Test data </button>
            </div>
        );
    }

    testData = () => {
        this.db.readFromDb();
    }
}