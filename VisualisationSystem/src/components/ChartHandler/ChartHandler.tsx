import React, {Component} from 'react';
import Chart from '../Chart/Chart';

import "./ChartHandler.css";

export default class ChartHandler extends Component<{graphedCountries}, {graphedCountries}> {

    constructor(props, state) {
        super(props, state);
        this.state = {
            graphedCountries: this.props.graphedCountries
        };
    }
    
    render() {
        const data = this.state.graphedCountries.map(d => {
            return {
                name: d[0],
                value: d[1]
            };
        });
        return (
            data.length > 0 ? <Chart data={data}/> : <div className="filler"/>
        );
    }

}