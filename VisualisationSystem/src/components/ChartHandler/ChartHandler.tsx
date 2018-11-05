import React, {Component} from 'react';
import Chart from '../Chart/Chart';

export default class ChartHandler extends Component<{countryList, indicator}> {
    
    render() {
        const data = this.props.countryList.map(d => {
            return {
                name: d[0],
                value: d[1]
            };
        });
        return (
            <Chart data={data}/>
        );
    }

}