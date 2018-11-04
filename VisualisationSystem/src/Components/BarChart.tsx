"use strict";

import * as d3 from 'd3';
import * as React from 'react';
import { Component } from 'react';
import DatabaseModule from '../Modules/DatabaseModule'

class BarChart extends Component<{ db: Map<string | null, any> }> {

  private mapElement: any;
  private data: Map<string | null, any>;

  constructor(db: Map<string | null, any>) {
    super({ db });
    this.data = db;
  }

  componentDidMount() {
    this.renderMap();
  }

  componentDidUpdate() {
    this.renderMap();
  }

  renderMap() {

    const stuff: number[] = [1, 2, 3, 5, 4, 5, 2, 7, 3, 5, 7, 2, 1, 1];

    // Scale to the amount and size of data
    const width = window.screen.width / 2,
      height = window.screen.height / 2,
      cellWidth = width * 0.8 / (stuff.length),
      cellHeight = height * 0.8 / this.highestValue(stuff);

    const margin = {
      top: 10,
      bottom: 20,
      left: 50,
      right: 10
    };

    let svg = d3.select(this.mapElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // area check
    // svg.append('rect')
    // .attr('fill', 'cyan')
    // .attr('width', width)
    // .attr('height', height );

    svg.selectAll('.rect-group')
      .data(stuff)
      .enter()
      .append('rect')
      .attr('class', 'rect-group')
      .attr('transform', function (d, i) {
        return 'translate(' + (i * cellWidth + cellWidth) + ',' + (height - cellHeight * d) + ')';
      })
      .attr('fill', 'steelBlue')
      .attr('width', cellWidth - 1)
      .attr('height', function (d) {
        return d * cellHeight;
      })
      .on("mouseover", function (item, index) {
        d3.select(this).attr('fill', 'crimson')
      })
      .on("mouseout", function (item, index) {
        d3.select(this).attr('fill', 'steelBlue')
      });

    // const x = d3.scaleLinear().domain([0,rounds]).range([0, cellSize * (rounds)]);
    // const y = d3.scaleLinear().domain([2014,2008]).range([cellSize * allResults.length, 0]);
      
    // svg.append('g')
    //   .attr("class", "axis axis--x")
    //   .attr("transform", "translate(" + (cellWidth * 2 - 2) + "," + (height / 2 + cellHeight * 1.5 + 5) + ")")
    //   .call(d3.axisBottom(x));



  }

  highestValue = (input: number[]) => {
    let highest: number = -1;
    input.forEach(function (value) {
      if (value > highest)
        highest = value;
    });

    return highest;
  }

  render() {

    return (
      <div>
        <div className="BarChart" ref={el => { this.mapElement = el; }}></div>
      </div>
    )

  }
}

export default BarChart;