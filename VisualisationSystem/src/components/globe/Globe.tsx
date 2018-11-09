import * as d3 from 'd3';
import * as React from 'react';
import { Component } from 'react';
import DataMap from "datamaps";
import "./Globe.css";
import GlobeHandler from '../globeHandler/GlobeHandler';
import CountryInfo from '../../pages/countryInfo/CountryInfo';

class Globe extends Component<{data: any, globeHandler: GlobeHandler, changeView: any}> {

    private globeHandler: GlobeHandler = this.props.globeHandler;

    private map;

    private scale: number;
    private x: number;
    private y: number;

    constructor(props: any, state: any) {
        super(props, state);
    }

    do = (): void => {
        this.scale = 1.0;
        this.x = 0;
        this.y = 0;

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
                    return { path: path, projection: projection }
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
                },

                done: (datamap) => {
                    datamap.svg.selectAll('.datamaps-subunit').on('click', (geography, data, data2) => {
                        this.props.changeView(geography.id);

                    });
                }
            }

        );

        this.globeHandler.zoomInF = this.zoomIn;
        this.globeHandler.zoomOutF = this.zoomOut;
        this.globeHandler.zoomResetF = this.zoomReset;
        this.globeHandler.panF = this.pan;

        this.map = map;
    }

    componentDidMount() {
        this.do();
    }

    componentDidUpdate() {
        // console.log(this.state.countryView);
        // if(this.state.countryView.type.name !== "CountryInfo"){
        this.do();

    }

    zoomIn = () => {

        this.scale += 0.5;

        const translate: string = "scale(" + this.scale.toString()+ ")" + "translate(" + this.x.toString() + "," + this.y.toString() + ")";

        this.map.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", translate);
    }

    zoomOut = () => {
        this.scale -= 0.5;
        const translate: string = "scale(" + this.scale.toString()+ ")" + "translate(" + this.x.toString() + "," + this.y.toString() + ")";

        this.map.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", translate);
    }

    zoomReset = () => {

        this.scale = 1;
        this.x = 0;
        this.y = 0;
        const translate: string = "scale(" + this.scale.toString()+ ")" + "translate(" + this.x.toString() + "," + this.y.toString() + ")";

        this.map.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", translate);
    }

    pan = (x: number, y: number) => {

        this.x += x;
        this.y += y;

        const translate: string = "scale(" + this.scale.toString()+ ")" + "translate(" + this.x.toString() + "," + this.y.toString() + ")";
        this.map.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", translate);
    }

    render() {

        return (
            <div id="container" className="mapHolder"></div>
        );
    }
}

export default Globe;

