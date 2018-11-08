
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


class CountryInfo extends Component<{ country: string }, {}> {


    data: any;
    country: any
    constructor(props: any, state: any) {
        super(props, state);
        var c: any = this.props.country.toLowerCase();
        this.country = App.countryData.get(c)

    }



    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {

        return (
            <div className = "info">

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
                <Table.Cell>{this.country.$budget.expenditure}</Table.Cell>
 
              </Table.Row>
              <Table.Row>
                <Table.Cell>PPP</Table.Cell>
                <Table.Cell>{this.country.$ppp ? this.country.$ppp.years.get(2017): "no data found"}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Unemployment Rate</Table.Cell>
                <Table.Cell>{this.country.$unemployment ? this.country.$unemployment.years.get(2017): "no data found" }</Table.Cell>

              </Table.Row>
              <Table.Row>
                <Table.Cell>Inflation Rate</Table.Cell>
                <Table.Cell>{this.country.$inflation ? this.country.$inflation.years.get(2017): "no data found"}</Table.Cell>

              </Table.Row>

              <Table.Row>
                <Table.Cell>Public Debt</Table.Cell>
                <Table.Cell>{this.country.$publicDebt ? this.country.$publicDebt.years.get(2017): "no data found"}</Table.Cell>

              </Table.Row>
            </Table.Body>
        
          </Table>
        </div>
        );
    }
}

export default CountryInfo;

