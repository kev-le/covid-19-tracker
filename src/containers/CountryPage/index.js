import React, {Component, Button} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCountryCodes, getCountryStats, getCountryRegionStats } from '../../actions/covid'
import { Divider, Header, Icon, Dropdown,
         Dimmer, Loader, Segment, Message } from 'semantic-ui-react'
import GlobalCards from '../../components/GlobalCards'
import Moment from 'react-moment';
import MaterialTable from "material-table";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


class CountryPage extends Component {

  state = {
    countryText: "Canada"
  }

  componentDidMount = () => {
    if (this.props.countryCodes.isLoading || this.props.countryCodes.countryList === undefined) {
      this.props.getCountryCodes()
      this.props.getCountryStats('ca', this.state.countryText)
      this.props.getCountryRegionStats('ca')
    }
  }

  getCountryObject = (country) => {
    return {
      key : country.iso2.toLowerCase(),
      value : country.iso2.toLowerCase(),
      flag: country.iso2.toLowerCase(),
      text: country.name
    }
  }

  getRegionObject = (region) => {
    return {
      provinceState : region.provinceState,
      confirmed : region.confirmed,
      active : region.active,
      recovered : region.recovered,
      deaths : region.deaths
    }
  }

  getFilterRegions = (regionList) => {
    var filteredRegions = {}
    for (var i = 0; i < regionList.length; i++) {
      if (regionList[i].provinceState in filteredRegions && (regionList[i].confirmed > filteredRegions[regionList[i].provinceState].confirmed)) {
        filteredRegions[regionList[i].provinceState] = regionList[i]
      } else if (!(regionList[i].provinceState in filteredRegions)) {
        filteredRegions[regionList[i].provinceState] = regionList[i]
      }

      var regionObj = filteredRegions[regionList[i].provinceState]
      if (regionObj.recovered === 0) {
        filteredRegions[regionList[i].provinceState].recovered = 'No data'
      }

    }
    return Object.values(filteredRegions)
  }


  handleDropdown = (e, {value}) => {
    this.props.getCountryStats(value, e.target.textContent)
    this.props.getCountryRegionStats(value)
    this.setState({'countryText': e.target.textContent })
  }

  render() {
    var countries = []
    var countryOptions = []
    if (!this.props.countryCodes.isLoading &&
      this.props.countryCodes.countryList !== undefined &&
      this.props.countryCodes.countryList.length !== 0) {
      countries = this.props.countryCodes.countryList
      for (var i = 0; i < countries.length; i++) {
        if (countries[i].iso2 !== undefined) {
          if (countries[i].name === 'US') {
            countries[i].name = 'United States'
          }
          countryOptions.push(this.getCountryObject(countries[i]))
        }
      }
    }

    var tableData = []
    var regions = []
    var tableLength = 0
    if (!this.props.countryRegion.isLoading &&
        this.props.countryRegion.regionList !== undefined &&
        this.props.countryRegion.regionList.length !== 0) {
      regions = this.props.countryRegion.regionList
      for (var i = 0; i < regions.length; i++) {
        tableData.push(this.getRegionObject(regions[i]))
      }
      
      tableData = this.getFilterRegions(tableData)
      tableLength = tableData.length
      if (tableLength === 1) {
        // No region stats available
        tableData = []
      }
    }
    return (
      <div>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='globe' />
            Country Filter
          </Header>
        </Divider>

        <Dropdown
          className='countryDropdown'
          defaultValue='ca'
          fluid
          search
          selection
          options={countryOptions}
          onChange={this.handleDropdown}
        />

        {this.props.countryStats.error && (
          <Message negative className='errorMessageCountry'>
            <Message.Header>Could not find stats for selected country.</Message.Header>
          </Message>
        )}

        <Header as='h1' textAlign='center'>Stats for {this.props.countryStats.countryText}</Header>
        <Header as='h5' textAlign='center'>
          <p>
            Last updated:
            {this.props.countryStats.lastUpdate && (
              <Moment format="MMM D YYYY hh:mm:ss" withTitle>
                {this.props.countryStats.lastUpdate}
              </Moment>
            )}
          </p>
        </Header>

        <Segment basic>
          {this.props.countryStats.isLoading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : <div/>}
          <GlobalCards 
            className='statsBox'
            confirmed={this.props.countryStats.confirmed.value}
            recovered={this.props.countryStats.recovered.value}
            deaths={this.props.countryStats.deaths.value}
          />
        </Segment>

        {this.props.countryRegion.regionList.length === 1 && (
          <Header color='red' as='h5' textAlign='center'>No region stats available for this country</Header>
        )}
        <div className='regionTable'>
          <MaterialTable
            isLoading={this.props.countryRegion.isLoading}
            options={{
              pageSize: 7,
            }}
            icons={tableIcons}
            columns={[
              { title: "Province/State", field: "provinceState" },
              { title: "Total Cases", field: "confirmed" },
              { title: "Active", field: "active" },
              { title: "Recovered", field: "recovered" },
              { title: "Deaths", field: "deaths" }
            ]}
            data={ tableData }
            title={"Region Stats for " + this.props.countryStats.countryText}
          />
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = ({ covid }) => ({
  countryCodes: covid.countryCodes,
  countryStats: covid.countryStats,
  countryRegion: covid.countryRegion
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCountryCodes,
      getCountryStats,
      getCountryRegionStats
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryPage)
