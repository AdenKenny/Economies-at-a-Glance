import * as React from "react";
import { Component } from 'react';

import "./ScaleBox.css";

class ScaleBox extends Component<{scaleLabel: string, className: string}> {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="scaleLabel">
                <div className="scaleLabelLabel"> {this.props.scaleLabel} </div>  
                <div id="rectangle" className={this.props.className}> </div>
            </div>
        );
    }
}

export default ScaleBox;