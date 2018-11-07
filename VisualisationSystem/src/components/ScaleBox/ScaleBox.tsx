import * as React from "react";
import { Component } from 'react';

import "./ScaleBox.css";

class ScaleBox extends Component<{className: string}> {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="rectangle" className={this.props.className}> </div>
        );
    }

}

export default ScaleBox;