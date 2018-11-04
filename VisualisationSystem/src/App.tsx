import * as React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

import DatabaseModule from './modules/DatabaseModule';
import MapView from './pages/mapview';
import GraphView from './pages/graphview';
import logo from './logo.svg';
import Select from 'react-select';
import NavBar from "./components/navBar/NavBar"

const countryList = [];

class App extends React.Component<{}, { view: any, dataLoaded: boolean }> {

    private db: DatabaseModule;
    public static countryData: Map<string | null, any>;

    private graphClass: any;

    private graphView: JSX.Element;
    private mapView: JSX.Element;

    private countries: any = [];


    constructor(props: any, state: any) {
        super(props, state);
        this.db = new DatabaseModule();
        App.countryData = new Map<string | null, any>();


        let count = 0;
        // this.superData.forEach((name, info) => {
        //   let countryName = name.name;
        //   countryValue[count] = (name.population != null ? name.population.total : 0);
        //   countryInfo[count] = [countryName, countryValue[count]]; 
        //   count++;
        // })


        this.state = {
            view: undefined,
            dataLoaded: false
        };
    }

    componentDidMount() {
        this.db.readFromDb().then(country => {
            App.countryData = country;
            App.countryData.forEach((key, value) => {
                this.countries.push({ value: value, label: value })
            });

            if (this.mapView === undefined) {
                this.mapView = <MapView indicator="ppp"/>;
            }

            if (this.graphView === undefined) {
                this.graphView = <GraphView countries={this.countries}> </GraphView>;
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
            this.setState({ view: this.mapView })
        }
        else if (value.label === 'Graph View') {
            this.setState({ view: this.graphView })
        }
    }

    private changeValue = (val) => {
        if (!this.state.dataLoaded) {
            return;
        }
        this.setState({
            view: <MapView indicator={val.value}/>
        });
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Economies at a Glance</h1>
                    <NavBar changeValue={this.changeValue} changeView={this.changeView}/>
                </header>
                {
                    this.state.dataLoaded ? this.state.view : <div></div>
                }
            </div>
        );
    }

}

export default App;