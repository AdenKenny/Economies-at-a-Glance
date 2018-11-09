;
"use strict";

import * as React from "react";
import { Component } from 'react';

import "./TitleBlock.css";

class TitleBlock extends Component<{title: string}> {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <b> 
                    {this.props.title}
                </b>
            </div>
        );
    }
}

export default TitleBlock;