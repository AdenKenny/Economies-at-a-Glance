import * as React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

import DatabaseModule from './modules/DatabaseModule';
import MapView from './pages/mapview/mapview';
import GraphView from './pages/graphview/graphview';
import logo from './logo.svg';
import Select from 'react-select';
import NavBar from "./components/navBar/NavBar";
import HelpMenu from "./components/HelpMenu/HelpMenu";

import DataHandler from './util/dataHandler';
import Help from "./pages/help/Help";

class App extends React.Component<{}, { view: any, helpMenuOpen: boolean, dataLoaded: boolean, viewStore: any }> {

    private db: DatabaseModule;
    public static countryData: Map<string | null, any>;
    public static dataHandler: DataHandler;

    private graphClass: any;

    private navBar;

    private graphView: JSX.Element;
    private mapView: JSX.Element;

    private countries: any = [];


    constructor(props: any, state: any) {
        super(props, state);
        this.db = new DatabaseModule();
        App.countryData = new Map<string | null, any>();


        this.state = {
            view: undefined,
            dataLoaded: false,
            viewStore: undefined,
            helpMenuOpen: false,
        };
    }
    // const data = {
    //     label: 'search me',
    //     value: 'searchme',
    //     children: [
    //       {
    //         label: 'search me too',
    //         value: 'searchmetoo',
    //         children: [
    //           {
    //             label: 'No one can get me',
    //             value: 'anonymous'
    //           }
    //         ]
    //       }
    //     ]
    //   }
    componentDidMount() {
        this.db.readFromDb().then(country => {
            App.countryData = country;
            var seenReg: any = [];
            // var data: any = {
            //  children: []
            //  };
            App.countryData.forEach((value, key) => {
                if (!seenReg.includes(value.$region)) {

                    this.countries.push({
                        value: value.$region, label: value.$region,
                        children: [
                            { value: key, label: value.$name }
                        ]
                    });
                    seenReg.push(value.$region);
                }
                else {
                    for (let region of this.countries) {
                        if (region.value === value.$region) {
                            region.children.push({ value: key, label: value.$name })
                        }
                    }
                }

                //this.countries.push({ value: value, label: value })
            });

            App.dataHandler = new DataHandler(App.countryData);

            if (this.mapView === undefined) {
                this.mapView = <MapView indicator="ppp" />;
            }

            if (this.graphView === undefined) {
                this.graphView = <GraphView countries={this.countries} indicator="ppp" ref={(child) => { this.graphClass = child; }} />;
            }

            this.setState({
                view: this.mapView,
                dataLoaded: true
            });
        });
    }


    // handleChange = (selectedOption: any) => {
    //   this.setState({ selectedOption });
    //   console.log(`Option selected:`, selectedOption);
    // }


    private changeView = (value: { value: string, label: string }) => {
        if (!this.state.dataLoaded) {
            return;
        }
        if (value.label === 'Map View') {
            this.setState({ view: this.mapView });
            this.navBar.setState({ isMap: true });
        }
        else if (value.label === 'Graph View') {
            this.setState({ view: this.graphView });
            this.navBar.setState({ isMap: false });
        }
    }

    private changeValue = (val) => {
        if (!this.state.dataLoaded) {
            return;
        }

        if (this.navBar.state.isMap) {
            this.setState({
                view: <MapView indicator={val.value} />
            });
        }
        else {
            this.graphClass.setState({
                indicator: val.value
            });
        }
    }

    private toggleHelp = (isHelp) => {
        //if help is supposed to be showing then store the last view and show help
        if (isHelp) {
            this.setState({
                viewStore: this.state.view,
                helpMenuOpen : true,
            });

            console.log(this.state);
        }
        //if closing help, then get last view and show it
        else {
            this.setState({                
                helpMenuOpen: false,
            });
        }
    }


    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Economies at a Glance</h1>
                    <NavBar changeValue={this.changeValue} changeView={this.changeView} toggleHelp={this.toggleHelp} ref={(child) => { this.navBar = child; }} />
                </header>
                <div className="mainContainer">
                {
                    this.state.dataLoaded ? this.state.view : <div></div>
                }
                {
                    this.state.helpMenuOpen ? <HelpMenu> </HelpMenu>: <div> </div>
                }    
                </div>
                
            </div>
        );
    }

}

export default App;