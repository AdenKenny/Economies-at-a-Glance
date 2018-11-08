import * as d3 from 'd3';
import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';

import './Bars.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

export default class Bars extends Component<{maxValue, scales, margins, data, svgDimensions}> {

  constructor(props) {
    super(props);
  }

  doSomething(position:any, country:any){
    let xPos = position.props.x,
    yPos = position.props.y,
    name = country.name,
    value = country.value;

  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props;
    const { xScale, yScale } = scales;
    const { height } = svgDimensions;    

    const bars = [];
    data.forEach((datum, i) => {
      const value = datum.value !== undefined ? datum.value : 0;
      bars.push(
        // <Tooltip content="😎">
        <Tooltip 
          placement='rightTop' 
          overlay={'Population of ' + datum.name + ': ' + Bars.numberFormatter(value)}
          key={i * 2}
        >
        <rect
          id={i}
          key={i * 2 + 1}
          className='bars' 
          x={xScale(datum.name)}
          y={yScale(value)}
          height={height - margins.bottom - scales.yScale(value)}
          width={xScale.bandwidth()}
          />      
        </Tooltip>    
          
      );
    });


    return (
        <g>
          {bars}
        </g>
    );
  }

  static numberFormatter = (input: number) => {
    if (input > 999999999) {
      return (input / 1000000000).toFixed(2) + 'b';
    } else if (input > 999999) {
      return (input / 1000000).toFixed(1) + 'm';
    } else if (input > 999) {
      return (input / 1000).toFixed(1) + 'k';
    } else {
      return input;
    }
  }
}