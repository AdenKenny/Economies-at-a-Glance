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
    + "  The Value drop down changes the statistic the website shows, i.e. the GDP of certain countries\n"
    + "  The View drop down changes which view is shown. It contains two options, graph view and map view"

const mapView = "Map View is a map of the world in which data is shown depending on what was selected in the tool bar. There are three main functionalities that this Map View can perform\n"
    + " Firstly, the map can zoom via ....\n"
    + "  Secondly, the map can pan via...\n"
    + "  Lastly, the map allows a country to be clicked that will shown all relitive information about the clicked country, including everything shown from the tool bar's Value drop down.\n\n\n"

const graphView = "";


const items = [
    { divider: true, label: 'Main navigation', value: 'main-nav' },
    {
        label: 'ToolBar', value: 'intro',
 
    },
    {
        label: 'Map View', value: 'mv',
     
    },
    {
        label: 'Graph View', value: 'gv',
     
    },
    { divider: true, label: 'Motors', value: 'motors-nav' },
    { label: 'item 3', value: 'item3' }
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
                <SideMenu className = "side"  items={items}
                 onMenuItemClick={(value) => {
                     console.log(value);
                 }} 
                 />
                <div></div>
            </div>

        );
    }


}
