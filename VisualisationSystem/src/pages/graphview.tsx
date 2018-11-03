;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../modules/DatabaseModule";
import './graphview.css';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
const continents = [
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' }
];

const countries = [
    { value: 'New Zealand', label: 'New Zealand' },
    { value: 'Inflation Rate', label: 'New Zealand' },
    { value: 'BMI', label: 'New Zealand' },
    { value: 'GDP', label: 'New Zealand' }
];
export default class GraphView extends Component<{ db: DatabaseModule }> {

    private db: DatabaseModule;
    selectedOption: null
    private isTrend:boolean;
    private button:any;

    constructor(props: Readonly<{ db: DatabaseModule; }>) {
        super(props);
        this.db = this.props.db;
        this.isTrend=false;

        if(this.isTrend){
             this.button = <Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> Bar Graph </Button>
        }
        else{
            this.button = <Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> Yearly Trend </Button>
        }
    }

    // isMapView: boolean = true
    // const mapView = true;


    handleChange = (selectedOption: any) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    } 
    
    changeView(){
        this.isTrend = !this.isTrend;
        if(this.isTrend){
            this.button = <Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> Bar Graph </Button>
       }
       else{
           this.button = <Button variant="contained" color="primary" className="b" onClick = { () => this.changeView()}> Yearly Trend </Button>
       }
        console.log(this.isTrend);
        this.render();
        
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
   
                <div className="graphPane"></div>
                <div className="infoPane">

                    <div className="col1">
                        <h3>Switch to...</h3>
                        {this.button}
                    </div>
                    <div className="col2">
                        <Select className="selC" placeholder="Select Continent" options={continents} value={this.selectedOption} />

                    </div>
                    <div className="col3">
                        <Select className="selC" placeholder="Select Country" options={countries} value={this.selectedOption} />
                    </div>
                </div>
            </div>
        );
    }

    testData = () => {
        this.db.readFromDb();
    }
}