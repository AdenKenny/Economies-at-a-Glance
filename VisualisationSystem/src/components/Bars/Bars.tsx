import * as d3 from 'd3';
import React, { Component } from 'react';
import Animate from "react-move/Animate";
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';

import './Bars.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

export default class Bars extends Component<{maxValue, scales, margins, data, svgDimensions}> {

  constructor(props) {
    super(props);
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props;
    const { xScale, yScale } = scales;
    const { height } = svgDimensions;    

    const bars = [];
    data.forEach((datum, i) => {
      const value = datum.value !== undefined ? datum.value : 0;
      const tooltipLocation = value > 0 ? 'rightTop' : 'top';
      
      bars.push(
        
       <Tooltip 
       placement={tooltipLocation} 
       overlay={datum.name + ': ' + Bars.numberFormatter(value)}
       mouseLeaveDelay={0}
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
    if(input < 1){
      return 'No data';
    } else if (input > 999999999) {
      return (input / 1000000000).toLocaleString(navigator.language) + 'b';
    } else if (input > 999999) {
      return (input / 1000000).toLocaleString(navigator.language) + 'm';
    } else if (input > 999) {
      return (input / 1000).toLocaleString(navigator.language) + 'k';
    } else {
      return input;
    }
  }

}