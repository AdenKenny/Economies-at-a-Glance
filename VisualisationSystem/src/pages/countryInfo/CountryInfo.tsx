
import * as React from 'react';
import { Component } from 'react';
import App from "../../App";
import ReactTable from "react-table";

import { Icon, Label, Menu, Table } from 'semantic-ui-react';

import './CountryInfo.css';

class CountryInfo extends Component<{ country: any }> {


  render() {
    const dataHandler = App.dataHandler;

    const rows = App.graphIndicators.map((indicator, i) => {
      const fields = dataHandler.getFields(indicator.value);
      const value = dataHandler.getValue(fields.name, fields.field, fields.needsYear, this.props.country);
      let valueString;
      if (value !== undefined) {
        valueString = dataHandler.getValueString(value, fields);
      }
      else {
        valueString = "No data";
      }

      return (
        <Table.Row key={i}>
          <Table.Cell className="cell">
            <Label>{fields.title}</Label>
          </Table.Cell>
          <Table.Cell>{valueString}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div className="info">
        <div className="country"><h3>{this.props.country.name}</h3></div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows}
          </Table.Body>

        </Table>
      </div>
    );
  }

}

export default CountryInfo;

