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
      bars.push(
        
       <Tooltip 
       placement='rightTop' 
       overlay={datum.name + ': ' + Bars.numberFormatter(datum.value)}
       mouseLeaveDelay={0}
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
    if(input === undefined){
      return 0;
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