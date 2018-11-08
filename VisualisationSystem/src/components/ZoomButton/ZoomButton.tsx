import * as React from "react";
import { Component } from 'react';

import { Button } from "@material-ui/core";

import "./ZoomButton.css";

class ZoomButton extends Component<{onClick: () => void, text: string}> {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="zoomButton"> 
                <Button onClick={this.props.onClick}> <b>{this.props.text}</b> </Button>
            </div>
        );
    }

}

export default ZoomButton;
