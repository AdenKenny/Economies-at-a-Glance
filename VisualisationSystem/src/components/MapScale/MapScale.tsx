import * as React from "react";
import { Component } from 'react';
import ScaleBox from "../ScaleBox/ScaleBox";

class MapScale extends Component<{}> {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <ScaleBox className="default"> </ScaleBox>
                <ScaleBox className="one"> </ScaleBox>
                <ScaleBox className="two"> </ScaleBox>
                <ScaleBox className="three"> </ScaleBox>
                <ScaleBox className="four"> </ScaleBox>
                <ScaleBox className="five"> </ScaleBox>
                <ScaleBox className="six"> </ScaleBox>
                <ScaleBox className="seven"> </ScaleBox>
            </div>
        );
    }
}

export default MapScale;