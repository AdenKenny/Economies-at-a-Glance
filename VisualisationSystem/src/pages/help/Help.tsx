;
"use strict";

import * as React from "react";
import { Component } from "react";
import DatabaseModule from "../../modules/DatabaseModule";
import GlobeHandler from "../../components/globeHandler/GlobeHandler";
import CountryInfo from "../countryInfo/CountryInfo";
import Country from "../../util/country";
import SideMenu from "react-sidemenu";
import "./Help.css";

const toolBar = "The tool bar is broken into 3 sections, the Value drop down to the left, the View drop down in the middle, and the help button\n"
    + "  The Value drop down changes the statistic the website shows, i.e, the GDP of certain countries\n"
    + "  The View drop down changes which view is shown. It contains two options, graph view and map view"

const mapView = "Map View is a map of the world in which data is shown depending on what was selected in the tool bar. There are three main functionalities that this Map View can perform\n"
    + " Firstly, the map can zoom via ....\n"
    + "  Secondly, the map can pan via...\n"
    + "  Lastly, the map allows a country to be clicked that will shown all relitive information about the clicked country, including everything shown from the tool bar's Value drop down.\n\n\n"


const items = [
    { divider: true, label: 'Main navigation', value: 'main-nav' },
    {
        label: 'item 1', value: 'item1', icon: 'fa-search',
        children: [
            {
                label: 'item 1.1', value: 'item1.1', icon: 'fa-snapchat',
                children: [
                    { label: 'item 1.1.1', value: 'item1.1.1', icon: 'fa-anchor' },
                    { label: 'item 1.1.2', value: 'item1.1.2', icon: 'fa-bar-chart' }]
            },
            { label: 'item 1.2', value: 'item1.2' }]
    },
    {
        label: 'item 2', value: 'item2', icon: 'fa-automobile',
        children: [
            {
                label: 'item 2.1', value: 'item2.1',
                children: [
                    { label: 'item 2.1.1', value: 'item2.1.1' },
                    { label: 'item 2.1.2', value: 'item2.1.2' }]
            },
            { label: 'item 2.2', value: 'item2.2' }]
    },
    { divider: true, label: 'Motors', value: 'motors-nav' },
    { label: 'item 3', value: 'item3', icon: 'fa-beer' }
];
export default class Help extends Component<{}> {

    constructor(props) {


        super(props);

        // this.state = {
        //     countryView: <GlobeHandler indicator={this.props.indicator} changeView = {this.changeView} />,
        // }
    }

    render() {
        return (
            <div>
                <SideMenu className = "side"  items={items} renderMenuItemContent={(item) =>
                    (<span><strong style={{ color: "red" }}>{item.label}</strong></span>)} />
                <div></div>
            </div>

        );
    }


}
