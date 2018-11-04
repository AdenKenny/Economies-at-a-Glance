;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../modules/DatabaseModule";
import './graphview.css';
import Button from '@material-ui/core/Button';
import Select from 'react-select';

import BarChart from '../Components/BarChart';


const continents = [
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' }
];



const view = [
    { value: 'BG', label: 'Bar Graph' },
    { value: 'YT', label: 'Yearly Trend' },
];

export default class GraphView extends Component<{ countries: [string, string] }, { textValue: string, data: Map<string | null, any> | null }> {

    selectedOption: null
    private isTrend: boolean;
    private button: any;
    private countries: [string, string];

    private graphedCountries: any = [];

    constructor(props: Readonly<{ countries: [string, string], superData: Map<string | null, any> }>) {
        super(props);
        this.countries = this.props.countries;
        console.log(this.countries);
        this.state = {
            textValue: 'Bar Graph',
            data: null
        }
        this.isTrend = false;
    }

    setData(data: Map<string | null, any> | null) {
        if (this.state.data === null) {
            this.setState({ data: data });
        }
    }

    // isMapView: boolean = true
    // const mapView = true;


    // handleChange = (selectedOption: any) => {
    //     this.setState({ selectedOption });
    //     console.log(`Option selected:`, selectedOption);
    // } 

    // changeView(){
    //     this.isTrend = !this.isTrend;
    //     if(this.isTrend){
    //         this.button = <Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> Bar Graph </Button>
    //    }
    //    else{
    //        this.button = <Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> Yearly Trend </Button>
    //    }
    //     console.log(this.isTrend);
    //     this.render();

    // }
    // getView(){
    //     if(this.isTrend){
    //         return (<Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> {this.state.textValue}</Button>);
    //    }
    //    else{
    //        return (<Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> Yearly Trend </Button>);
    //    }

    // }

    private changeCountries(value: any) {
        console.log("changing countries");
        //this.graphedCountries=value;
        if (this.state.data === null) {
            return;
        }
        this.graphedCountries =[];


        for (let entry of value) {
            var theName: string = entry.value;
            var theNum: number = (this.state.data.get(entry.value).$population != null ? this.state.data.get(entry.value).$population.total : 0);
            //console.log(object.$population.total);
            this.graphedCountries.push([theName, theNum]);
            // console.log(entry);
            //console.log(this.state.data.get(entry.value).$name);
            // this.graphedCountries = 
        }
        this.setState({
            
        })

    }

    render() {
        // let button;
        // if(this.isTrend){
        //      button = <Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> Bar Graph </Button>
        // }
        // else{
        //     button = <Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> Yearly Trend </Button>
        // }

        return (
            <div className="body">

                <div className="graphPane">

                    {
                        this.graphedCountries.length>0 ? <BarChart countryList={this.graphedCountries} ></BarChart> : <div></div>
                    }

                </div>
                <div className="infoPane">

                    <div className="col1">
                        <Select className="selC" placeholder="Select Year" options={view} />
                    </div>
                    <div className="col2">
                        <Select className="selC" placeholder="Select Continent" options={continents} />

                    </div>
                    <div className="col3">
                        <Select className="selC" placeholder="Select Country" options={this.countries} isMulti={true} onChange={(value) => { this.changeCountries(value) }} />
                    </div>
                </div>
            </div>
        );
    }
}