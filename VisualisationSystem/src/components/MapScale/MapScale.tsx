import * as React from "react";
import { Component } from 'react';
import ScaleBox from "../ScaleBox/ScaleBox";

import "./MapScale.css";

class MapScale extends Component<{data: string[]}> {

    constructor(props: {data: string[]}) {
        super(props);
    }

    render() {

        const scaleBoxes = [<ScaleBox key={-1} scaleLabel="No Data" className="default"> </ScaleBox>];

        const numbers = ["one", "two", "three", "four", "five", "six", "seven"];
        
        for (let i = 0; i < this.props.data.length - 1; i++) {
            scaleBoxes.push(<ScaleBox key={i} scaleLabel={this.props.data[i] + " - " + this.props.data[i + 1]} className={numbers[i]}> </ScaleBox>);
        }

        return (
            <div className="scaleBox">
                {scaleBoxes}
            </div>
        );
    }
}

export default MapScale;