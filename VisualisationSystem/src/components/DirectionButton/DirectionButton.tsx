import * as React from "react";
import { Component } from 'react';

import { Button } from "@material-ui/core";


class DirectionButton extends Component<{onClick: any, text: string, x: number, y: number}> {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="directionButton"> 
                <Button onClick= {() => {
                    this.props.onClick(this.props.x, this.props.y);    
                }}> 
                    <b>
                        {this.props.text}
                    </b> 
                    </Button>
            </div>
        );
    }

}

export default DirectionButton;
