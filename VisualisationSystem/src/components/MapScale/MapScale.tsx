import * as React from "react";
import { Component } from 'react';
import ScaleBox from "../ScaleBox/ScaleBox";

import "./MapScale.css";

class MapScale extends Component<{data: string[]}> {

    constructor(props) {
        super(props);
    }

    render() {

        const scaleKeys: string[] = this.props.data;
        
        if (scaleKeys.length == 7) { // Make sure there are the correct number of scale keys.
            return (
                <div className="scaleBox">
                        <ScaleBox scaleLabel="No Data" className="default"> </ScaleBox>
                        <ScaleBox scaleLabel={"<= " + scaleKeys[0]} className="one"> </ScaleBox>
                        <ScaleBox scaleLabel={scaleKeys[1]} className="two"> </ScaleBox>
                        <ScaleBox scaleLabel={scaleKeys[2]} className="three"> </ScaleBox>
                        <ScaleBox scaleLabel={scaleKeys[3]} className="four"> </ScaleBox>
                        <ScaleBox scaleLabel={scaleKeys[4]} className="five"> </ScaleBox>
                        <ScaleBox scaleLabel={scaleKeys[5]} className="six"> </ScaleBox>
                        <ScaleBox scaleLabel={">= " + scaleKeys[6]} className="seven"> </ScaleBox> 
                </div>
            );
        }

        return (
            <div> </div>
        );

       
    }
}

export default MapScale;