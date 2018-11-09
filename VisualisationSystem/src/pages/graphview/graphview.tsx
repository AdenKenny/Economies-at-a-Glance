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

import Country from '../../util/dataHandler';

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

export default class GraphView extends Component<{ countries: any, indicator: string }, { indicator }> {

    private button: any;
    private countries: any[];

    private graphedCountries: Country[];

    private chart;

    constructor(props: Readonly<{ countries: any, indicator: string }>, state) {
        super(props, state);
        this.graphedCountries = [];
        this.countries = this.props.countries;

        this.state = {
            indicator: this.props.indicator
        };
    }

    getIndicatorName = (rawInd: string): string => {

        console.log(rawInd);

        let ind = "";
        
        if (rawInd === "growthRateAbsolute") {
            ind = "Growth Rate (%)";
        }

        if (rawInd === "growthRateAbsolute") {
            ind = "Growth Rate (%)";
        }

        if (rawInd === "inflationAbsolute") {
            ind = "Inflation Rate (%)";
        }

        if (rawInd === "budgetRevenue") {
            ind = "Revenue (USD)";
        }

        if (rawInd === "budgetExpenditure") {
            ind = "Expenditure (USD)";
        }

        if (rawInd === "gini") {
            ind = "Gini Index";
        }

        if (rawInd === "populationBelow") {
            ind = "Population (%)";
        }

        if (rawInd === "householdIncomeTop") {
            ind = "Percentage of Wealth (%)";
        }

        if (rawInd === "householdIncomeBottom") {
            ind = "Percentage of Wealth (%)";
        }

        if (rawInd === "unemploymentAbsolute") {
            ind = "Unemployment (%)";
        }
        
        return ind;
    }

    render() {
        return (
            <div className="graphMainFlex">
                <div className="yLabelContainer">
                    <div className="yLabel">
                        {this.getIndicatorName(this.state.indicator)}
                    </div>
                </div>
                <div className="body">
                    <ChartHandler graphedCountries={this.graphedCountries} indicator={this.state.indicator} ref={(child) => this.chart = child} />
                    <div className="infoPane">
                        <div className="titleDiv"> <b> Country Select </b> </div>
                        <div className="selectionDiv"><DropdownTreeSelect className="selector" data={this.countries}
                            onChange={this.onChange} selected={this.graphedCountries} /></div>


                    </div>
                </div>
            </div>
        );
    }

    onChange = (value, values) => {
        const changed = this.getChanged(values);
        let data = App.countryData;
        this.graphedCountries = changed.map(countryName => {
            return data.get(countryName);
        });
        this.chart.setState({ graphedCountries: this.graphedCountries });
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