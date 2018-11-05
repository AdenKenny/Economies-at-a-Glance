;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../../modules/DatabaseModule";
import './graphview.css';
import Button from '@material-ui/core/Button';
import Select from 'react-select';

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

import ChartHandler from '../../components/ChartHandler/ChartHandler';
import App from "../../App";

const continents = [
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' }
];

const view = [
    { value: 'BG', label: 'Bar Graph' },
    { value: 'YT', label: 'Yearly Trend' },
];

export default class GraphView extends Component<{ countries: any }, { textValue: string}> {

    selectedOption: null
    private isTrend: boolean;
    private button: any;
    private countries: any[];

    private graphedCountries = [];

    private chart;

    constructor(props: Readonly<{ countries: any, superData: Map<string | null, any> }>) {
        super(props);
        this.countries = this.props.countries;

        this.state = {
            textValue: 'Bar Graph',
        }
        this.isTrend = false;
    }

    render() {
        return (
            <div className="body">
                <ChartHandler graphedCountries={this.graphedCountries} ref={(child) => this.chart = child} ></ChartHandler>
                <div className="infoPane">
                    <div className="col3">
                        <DropdownTreeSelect className="selector" data={this.countries}
                            onChange={this.onChange} selected={this.graphedCountries} />
                    </div>
                </div>
            </div>
        );
    }

    onChange = (value, values) => {
        const changed = this.getChanged(values);
        let data = App.countryData;
        const graphedCountries = changed.map(countryName => {
            const countryData = data.get(countryName);
            const pop: number = (countryData.$population != null ? countryData.$population.total : 0);
            return [countryData.$name, pop];
        });

        this.graphedCountries = graphedCountries;
        this.chart.setState({graphedCountries: graphedCountries});
    }

    getChanged = (values) => {
        const changed = [];
        for (let entry of values) {
            //if the entry is a region then all that region has been ticked
            if (entry._depth === 0) {

                for (let country of entry._children) {
                    const split = country.split('-');
                    const countryName: string = this.countries[parseInt(split[0])].children[parseInt(split[1])].value;
                    changed.push(countryName);
                }
            }
            else {
                changed.push(entry.value);
            }
        }
        return changed;
    }
}