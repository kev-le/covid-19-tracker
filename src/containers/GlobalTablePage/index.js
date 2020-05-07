import React, {Component, Button} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllCountryStats } from '../../actions/covid'
import { updateTablePage } from '../../actions/global'
import { Divider, Header, Icon, Flag, Menu } from 'semantic-ui-react'
import { Paper } from '@material-ui/core';
import Moment from 'react-moment';
import MaterialTable from "material-table";
import TableIcons from '../../components/TableIcons'
import CountryCard from '../../components/CountryCard';


class GlobalTablePage extends Component {

  componentDidMount = () => {
    if (this.props.allCountry.isLoading || this.props.allCountry.countryList === undefined || this.props.allCountry.countryList.length === 0) {
      this.props.getAllCountryStats()
    }
  }

  handleItemClick = (e, { name }) => {
    this.props.updateTablePage(name)
  }


  getCountryObject = (country) => {
    if (country.countryInfo.iso2 === null || country.countryInfo.iso2 === undefined) {
      country.countryInfo.iso2 = ''
    }

    if (country.countryInfo.flag === null || country.countryInfo.flag === undefined) {
      country.countryInfo.flag = ''
    }

    return {
      flag : country.countryInfo.flag,
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
      lastUpdated = countryList[0].updated

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
      
      // sort by total cases
      tableData.sort( (a,b) => { return b.cases - a.cases })
    }

    let selected = this.props.tablePage.selected
    return (
      <div>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='globe' />
            Global Cases per Country
          </Header>
        </Divider>

        <Menu className='menuBar' secondary>
          <Menu.Item
            name='cards'
            active={selected === 'cards'}
            onClick={this.handleItemClick}
          >
            Card View
          </Menu.Item>

          <Menu.Item
            name='table'
            active={selected === 'table'}
            onClick={this.handleItemClick}
          >
            Table View
          </Menu.Item>
        </Menu>

        <Header as='h5' textAlign='center'>
          <p>
            Last updated: &nbsp;
            {lastUpdated && (
              <Moment fromNow>
                {lastUpdated}
              </Moment>
            )}
          </p>
        </Header>

        
        {selected === 'table' ? (
          <Paper className='globalTable'>
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
          </Paper>
        ) : (
          <div className='countryCardList'>
            {tableData.map(country => {
              return <CountryCard country={country}></CountryCard>
            })}
            
          </div>
        )}
      </div>
    )
  }
}
  
const mapStateToProps = ({ global, covid }) => ({
  tablePage: global.tablePage,
  allCountry: covid.allCountry
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllCountryStats,
      updateTablePage
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalTablePage)
