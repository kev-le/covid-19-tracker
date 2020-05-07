import React, {Component, Button} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllCountryStats } from '../../actions/covid'
import { Divider, Header, Icon, Flag } from 'semantic-ui-react'
import Moment from 'react-moment';
import MaterialTable from "material-table";
import TableIcons from '../../components/TableIcons'


class GlobalTablePage extends Component {

  componentDidMount = () => {
    if (this.props.allCountry.isLoading || this.props.allCountry.countryList === undefined || this.props.allCountry.countryList.length === 0) {
      this.props.getAllCountryStats()
    }
  }


  getCountryObject = (country) => {
    if (country.countryInfo.iso2 === null || country.countryInfo.iso2 === undefined) {
      country.countryInfo.iso2 = ''
    }

    return {
      iso : country.countryInfo.iso2.toLowerCase(),
      country : country.country,
      cases : country.cases,
      active : country.active,
      recovered : country.recovered,
      deaths : country.deaths
    }
  }

  render() {

    var tableData = []
    var lastUpdated = ''
    if (!this.props.allCountry.isLoading &&
        this.props.allCountry.countryList !== undefined &&
        this.props.allCountry.countryList.length !== 0) {


      var countryList = this.props.allCountry.countryList
      lastUpdated = countryList[0].lastUpdate

      // clean the data
      for (var i = 0; i < countryList.length; i++) {
        if (countryList[i].recovered === 0) {
          countryList[i].recovered = 'No data'
        }
        if (countryList[i].iso2 === 'US') {
          countryList[i].countryRegion = 'United States'
        }
        tableData.push(this.getCountryObject(countryList[i]))
      }
    }
    return (
      <div>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='globe' />
            Global Cases per Country
          </Header>
        </Divider>

        <Header as='h5' textAlign='center'>
          <p>
            Last updated: &nbsp;
            {lastUpdated && (
              <Moment format="MMM D YYYY hh:mm:ss" withTitle>
                {lastUpdated}
              </Moment>
            )}
          </p>
        </Header>

        <div className='globalTable'>
          <MaterialTable
            isLoading={this.props.allCountry.isLoading}
            options={{
              rowStyle: {
                height: '50px'
              },
              padding: 'dense',
              sorting: true,
              pageSize: 7,
            }}
            icons={TableIcons}
            columns={[
              { 
                title: "Country", field: "country", render: rowData => 
                <p><Flag name={rowData.iso} /> {rowData.country}</p>
              },
              { title: "Total Cases", field: "cases", defaultSort: "desc" },
              { title: "Active", field: "active" },
              { title: "Recovered", field: "recovered" },
              { title: "Deaths", field: "deaths" }
            ]}
            data={ tableData }
            title={"Global Country Stats"}
          />
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = ({ covid }) => ({
  allCountry: covid.allCountry
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllCountryStats
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalTablePage)
