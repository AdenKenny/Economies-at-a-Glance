import * as React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

import DatabaseModule from './modules/DatabaseModule';
import MapView from './pages/mapview';
import GraphView from './pages/graphview';
import logo from './logo.svg';
import Select from 'react-select';

const options1 = [
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' }
];

const options2 = [
    { value: 'Growth Rate', label: 'Growth Rate' },
    { value: 'Inflation Rate', label: 'Inflation Rate' },
    { value: 'BMI', label: 'Big Mac Index' },
    { value: 'GDP', label: 'GDP' }
];

const countries: any = [];

const view = [
    { value: 'Graph', label: 'Graph View' },
    { value: 'Map', label: 'Map View' },
];

const countryList = [];



class App extends React.Component<{}, { view: any, dataLoaded: boolean }> {

    private db: DatabaseModule;
    public static countryData: Map<string | null, any>;

    private graphClass: any;

    private graphView: JSX.Element;
    private mapView: JSX.Element;



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
                countries.push({ value: value, label: value })
            });

            if (this.mapView === undefined) {
                this.mapView = <MapView />;
            }

            if (this.graphView === undefined) {
                this.graphView = <GraphView countries={countries}> </GraphView>;
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

    private changeYear(value: any) {

    }

    private changeValue(value: any) {

    }

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


    public render() {

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Economies at a Glance</h1>
                    <div className="selectDiv">
                        <Select className="select" placeholder="Select Year" options={options1} onChange={(val) => this.changeYear(val)} />
                        <Select className="select" placeholder="Select Value" options={options2} onChange={(val) => this.changeValue(val)} />
                        <Select className="select" placeholder="Select View" options={view} onChange={(val: { value: string, label: string }) => this.changeView(val)} />
                    </div>

                </header>
                {
                    this.state.dataLoaded ? this.state.view : <div></div>
                }
            </div>
        );
    }

}

export default App;