import * as d3 from 'd3';
import * as React from 'react';
import { Component } from 'react';
import DataMap from "datamaps";
import "./Globe.css";
import GlobeHandler from '../globeHandler/GlobeHandler';

class Globe extends Component<{data: any, globeHandler: GlobeHandler}> {

    private globeHandler: GlobeHandler = this.props.globeHandler;

    private map;

    constructor(props, state) {
        super(props, state);
    }

    do = (): void => {

        const container: HTMLElement = document.getElementById('container');
        
        const nodes: NodeList = container.childNodes;

        for (let i = nodes.length - 1; i >= 0; --i) {
            container.removeChild(nodes[i]);
        }

        const map = new DataMap(
            {
                element: container, 
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
                data: this.props.data,
                geographyConfig: {
                    popupTemplate: (geography, data) => {
                        return '<div class="hoverinfo"><strong>' + data.name + '<br>' + data.value + '</strong></div>';
                    }
                }
            }
        );

        this.globeHandler.zoomInF = this.zoomIn;
        this.globeHandler.zoomOutF = this.zoomOut;
        this.globeHandler.zoomResetF = this.zoomReset;

        this.map = map;
    }

    componentDidMount() {
        this.do();
    }

    componentDidUpdate() {
        this.do();
    }

    zoomIn = () => {
        this.map.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", "scale(1.5)");
    }

    zoomOut = () => {
        this.map.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", "scale(0.75)");
    }

    zoomReset = () => {
        this.map.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", "scale(1)");
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

