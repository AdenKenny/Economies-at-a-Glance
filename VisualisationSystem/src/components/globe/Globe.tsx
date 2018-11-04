import * as d3 from 'd3';
import * as React from 'react';
import { Component } from 'react';
import DatabaseModule from '../../modules/DatabaseModule';
import DataMap from "datamaps";
import "./Globe.css";

class Globe extends Component<{data: any}> {

    constructor(props, state) {
        super(props, state);
    }

    do = (): void => {

        const map = new DataMap(
            {
                element: document.getElementById('container'), 
                setProjection: () => {
                    const projection = d3.geo.equirectangular();
                    const path = d3.geo.path().projection(projection);
                    return {path: path, projection: projection}
                },
                fills: {
                    defaultFill: "#AAAAAA",
                    "1": "#FAE7A2", 
                    "2": "#F6CD78", 
                    "3": "#F3B557", 
                    "4": "#EF972F", 
                    "5": "#EB7624", 
                    "6": "#C5642F", 
                    "7": "#A04B27", 
                }, 
                data: this.props.data
            }
        );
    }

    componentDidMount() {
        this.do();
    }

    render() {

        return (
            <div id="map">
                <div id="container" className="mapHolder"></div>
            </div>
        );
    }
}

export default Globe;

