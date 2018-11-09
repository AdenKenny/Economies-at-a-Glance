
import * as React from 'react';
import { Component } from 'react';
import App from "../../App";
import ReactTable from "react-table";

import { Icon, Label, Menu, Table } from 'semantic-ui-react'
const columns: any = [
    {
        accessor: 'category',
        Header: 'Category',
        maxWidth: 200
    }, {
        accessor: 'value',
        Header: 'Value',
        maxWidth: 200
    },

];


class CountryInfo extends Component<{ country: any } > {


    render() {

      if(this.props.country){

        return (
            <div className = "info">
            <h3>{this.props.country.name}</h3>
            <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body className = "tableBody">
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>Expenditure</Label>
                </Table.Cell>
                <Table.Cell>{this.props.country.$budget.expenditure}</Table.Cell>
 
              </Table.Row>
              <Table.Row>
                <Table.Cell>PPP</Table.Cell>
                <Table.Cell>{this.props.country.$ppp ? this.props.country.$ppp.years.get(2017): "no data found"}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Unemployment Rate</Table.Cell>
                <Table.Cell>{this.props.country.$unemployment ? this.props.country.$unemployment.years.get(2017): "no data found" }</Table.Cell>

              </Table.Row>
              <Table.Row>
                <Table.Cell>Inflation Rate</Table.Cell>
                <Table.Cell>{this.props.country.$inflation ? this.props.country.$inflation.years.get(2017): "no data found"}</Table.Cell>

              </Table.Row>

              <Table.Row>
                <Table.Cell>Public Debt</Table.Cell>
                <Table.Cell>{this.props.country.$publicDebt ? this.props.country.$publicDebt.years.get(2017): "no data found"}</Table.Cell>

              </Table.Row>
            </Table.Body>
        
          </Table>
        </div>
        );
    }
    else{
      return (<div></div>);
    }
  }
  
}

export default CountryInfo;

