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
      bars.push(
       // <Tooltip content="😎">
       <Tooltip 
       placement='rightTop' 
       overlay={'Population of ' + data[i].name + ': ' + Bars.numberFormatter(data[i].value)}
       >
        <rect
          id={i}
          key={i}
          className='bars' 
          x={xScale(datum.name)}
          y={yScale(datum.value)}
          height={height - margins.bottom - scales.yScale(datum.value)}
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