import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';

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
       // <Tooltip content="😎">
        <rect
          id={i}
          key={i}
          x={xScale(datum.name)}
          y={yScale(datum.value)}
          height={height - margins.bottom - scales.yScale(datum.value)}
          width={xScale.bandwidth()}
          fill={'#003366'}
          />
          
      );
    });

    return (
        <g>{bars}</g>
    );
  }
}