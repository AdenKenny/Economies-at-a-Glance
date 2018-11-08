import * as d3 from 'd3';
import * as React from 'react';
import { Component } from 'react';
import DatabaseModule from '../../modules/DatabaseModule';
import DataMap from "datamaps";
import "./Globe.css";

class Globe extends Component<{data: any}, {countryView: any}> {

    constructor(props:any, state:any) {
        super(props, state);

        this.state = {
            countryView: <div id="container" className="mapHolder"></div>
        };
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
                },
                done:  (datamap)=> {
                    datamap.svg.selectAll('.datamaps-subunit').on('click', (geography, data, data2) => {
                        console.log(geography.properties.name);
                        console.log(data2);
                        this.setState({
                            countryView: <div><button>YOUR MUM</button></div>
                        });
                    });
                }
            }

        );

    }

    componentDidMount() {
        this.do();
    }

    componentDidUpdate() {
        this.do();
    }

    render() {

        return (
            <div id="map">
                {this.state.countryView}
            </div>
        );
    }
}

export default Globe;

