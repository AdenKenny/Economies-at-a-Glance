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
var mapView:boolean = true;

class App extends React.Component {

  selectedOption: null
  // isMapView: boolean = true
  // const mapView = true;


  handleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  private changeView(){
    console.log(mapView);
     mapView= !mapView;
  }
  
  public render() {

    const db = new DatabaseModule();
 
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Economies at a Glance</h1>
          <div className="selectDiv">
            <Select className="select" placeholder="Select Year" options={options1} value={this.selectedOption} />
            <Select className="select" placeholder="Select Value" options={options2} value={this.selectedOption} />
            <Button variant="contained" color="primary" className="b" onClick = {this.changeView}>
              {mapView? "GRAPH VIEW": "MAP VIEW"}
            </Button>
          </div>

        </header>
        <body>
          <GraphView db={db}> </GraphView>
        </body>
      </div> 
    );
  }
}

export default App;