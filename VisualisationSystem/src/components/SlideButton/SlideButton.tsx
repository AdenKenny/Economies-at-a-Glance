;
"use strict";

import * as React from 'react';

import Button from "@material-ui/core/Button";

import "./SlideButton";

class SlideButton extends React.Component<{direction: string, onClick: () => void}> {
    constructor(props) {
        super(props);
    }

    render() {

        const text = this.props.direction === "left" ? "◄" : "►";

        return(
            <div>
                <Button onClick={this.props.onClick}> {text} </Button>
            </div>
        );
    }
}

export default SlideButton;