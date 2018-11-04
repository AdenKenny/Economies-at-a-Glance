"use strict";

import * as d3 from 'd3';
import * as React from 'react';
import { Component } from 'react';
import DatabaseModule from '../modules/DatabaseModule'

class BarChart extends Component<{ countryList:any }> {

  private mapElement: any;
  constructor(countryList:any) {
    super({countryList});
  }

  componentDidMount() {
    this.renderMap();
  }

  componentDidUpdate() {
    this.renderMap();
  }

  renderMap() {

  
    var countryInfo = this.props.countryList;

    console.log(countryInfo);

    // Scale to the amount and size of data
    const width = window.screen.width / 2,
      height = window.screen.height / 2,
      cellWidth = width * 0.95 / (countryInfo.length),
      cellHeight = height * 0.9 / this.highestValue(countryInfo);

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

    let tooltip = d3.select('body')
      .append('div')
      .style('background','#222')
      .style('color', 'white')
      .style('position', 'absolute')
      .style("z-index", "10")
      .style("visibility", "hidden");

    let selectedBar = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style("z-index", "10")
      .style("visibility", "hidden");

    svg.selectAll('.rect-group')
      .data(countryInfo)
      .enter()
      .append('rect')
      .attr('class', 'rect-group')
      .attr('transform', function (item, index) {
        return 'translate(' + (index * cellWidth + cellWidth) + ',' + (height - cellHeight * item[1]) + ')';
      })
      .attr('fill', 'steelBlue')
      .attr('width', cellWidth - 1)
      .attr('height', function (item) {
        return item[1] * cellHeight;
      })
      .on("mouseover", function (item, index) {
        d3.select(this).attr('fill', 'crimson');
        tooltip.style('visibility', 'visible')
          .text('Country: ' + item[0] + ', Total Population: ' + BarChart.numberFormatter(item[1]));
      })
      .on("mouseout", function (item, index) {
        d3.select(this).attr('fill', 'steelBlue');
        tooltip.style('visibility', 'hidden');
      })
      .on("mousemove", function (item, index) {
        tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      })
      .on("click", function (item, index) {
        console.log(item);
        selectedBar.style('visibility', 'visible')
          .text('Country: ' + item[0] + ', Total Population: ' + BarChart.numberFormatter(item[1]));
      });

    // const x = d3.scaleLinear().domain([0,rounds]).range([0, cellSize * (rounds)]);
    // const y = d3.scaleLinear().domain([2014,2008]).range([cellSize * allResults.length, 0]);

    // svg.append('g')
    //   .attr("class", "axis axis--x")
    //   .attr("transform", "translate(" + (cellWidth * 2 - 2) + "," + (height / 2 + cellHeight * 1.5 + 5) + ")")
    //   .call(d3.axisBottom(x));



  }

  highestValue = (input: any) => {
    // let highest: number = -1;
    // input.forEach(function (value) {
    //   if (value > highest)
    //     highest = value;
    // });

    return 100000000;
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

  render() {

    return (
      <div>
        <div className="BarChart" ref={el => { this.mapElement = el; }}></div>
      </div>
    )

  }
}

export default BarChart;
