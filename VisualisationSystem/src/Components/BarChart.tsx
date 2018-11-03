"use strict";

import * as d3 from 'd3';
import * as React from 'react';
import { Component } from 'react';
import DatabaseModule from '../Modules/DatabaseModule'

class BarChart extends Component<{ db: Map<string | null, any> }> {

  private mapElement: any;
  private db: Map<string | null, any>;

  componentDidMount() {
    this.db = this.db;
    this.renderMap();
  }

  componentDidUpdate() {
    this.renderMap();
  }

  renderMap() {

    const width = window.screen.width / 2,
      height = window.screen.height / 2,
      cellSize = 50;

    const margin = {
      top: 10,
      bottom: 20,
      left: 50,
      right: 10
    };

    const normalColour: String[] = ['steelBlue', 'blue'];
    const hoverColour: String[] = ['lightBlue', 'darkBlue'];

    const stuff: boolean[] = [true, false, false, true];

    let svg = d3.select(this.mapElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('.rect-group')
      .data(stuff)
      .enter()
      .append('rect')
      .attr('class', 'rect-group')
      .attr('transform', function (d, i) {
        return 'translate(' + (i * cellSize + cellSize) + ',' + cellSize + ')';
      })
      .attr('fill', function (d) {
        if (d)
          return 'steelBlue';
        else
          return 'azure';
      })
      .attr('width', cellSize - 1)
      .attr('height', cellSize - 1)
      .on("mouseover", function (item, index) {
        d3.select(this).attr('fill', function (d) {
          if (d)
            return 'crimson';
          else
            return 'lightBlue';
        })
      })
      .on("mouseout", function (item, index) {
        d3.select(this).attr('fill', function (d) {
          if (d)
            return 'steelBlue';
          else
            return 'azure';
        })
      });



  }

  render() {

    return (
      <div className="BarChart" ref={el => { this.mapElement = el; }}></div>
    )

  }
}

export default BarChart;