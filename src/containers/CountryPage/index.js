import React, {Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCountryCodes, getCountryStats, getCountryRegionStats, getCountryHistory } from '../../actions/covid'
import { updateCountryNavOption } from '../../actions/global'
import { Divider, Header, Icon, Dropdown,
         Dimmer, Loader, Segment, Message,
         Menu } from 'semantic-ui-react'
import { Paper } from '@material-ui/core'
import { Line } from 'react-chartjs-2';
import GlobalCards from '../../components/GlobalCards'
import Moment from 'react-moment';
import MaterialTable from "material-table";
import TableIcons from '../../components/TableIcons'


class CountryPage extends Component {

  componentDidMount = () => {
    if (this.props.countryCodes.isLoading || this.props.countryCodes.countryList === undefined) {
      this.props.getCountryCodes()
      this.props.getCountryStats('ca', 'Canada') // default value is Canada 'ca'
      this.props.getCountryRegionStats('ca')
    }

    if (this.props.countryHistory.isLoading || this.props.countryHistory.cases === undefined || this.props.countryHistory.cases.length === 0) {
      this.props.getCountryHistory('ca')
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
    var isoCode = value
    this.props.getCountryStats(isoCode, e.target.textContent)
    this.props.getCountryRegionStats(isoCode)
    this.props.getCountryHistory(isoCode)
  }

  handleItemClick = (e, {name}) => {
    this.props.updateCountryNavOption(name)
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

    let cases = this.props.countryHistory.cases
    let recovered = this.props.countryHistory.recovered
    let deaths = this.props.countryHistory.deaths
    let dateLabels = this.props.countryHistory.dates

    const data = {
      labels: dateLabels,
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: '+1',
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 15,
          data: cases
        },
        {
          label: 'Recoveries',
          fill: '+1',
          lineTension: 0.1,
          backgroundColor: 'rgba(50,205,50,0.4)',
          borderColor: 'rgba(50,205,50,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(50,205,50,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(50,205,50,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 15,
          data: recovered
        },
        {
          label: 'Deaths',
          fill: 'origin',
          lineTension: 0.1,
          backgroundColor: 'rgba(220,20,60,0.4)',
          borderColor: 'rgba(220,20,60,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(220,20,60,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(220,20,60,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 15,
          data: deaths
        }
      ]
    }

    // used to show empty chart while data loads
    const dummyData = {
      datasets: [{label:'', data: [0,100,5000,50000]}]
    }

    const options = {
        title: {
          display: true,
          text: this.props.countryStats.countryText + ' - Cases, Recoveries, and Deaths Since Jan 2020' ,
          fontSize: 20,
          fontColor: '#000000'
        },
        responsive: true,
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        },
        tooltips: {
          // Overrides the global setting
          mode: 'label'
        }
    }

    let selected = this.props.countryNav.selected
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
          value={this.props.countryStats.selectedCountry || 'ca'}
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
            Last updated: &nbsp;
            {this.props.countryStats.updated && (
              <Moment fromNow>
                {this.props.countryStats.updated}
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
            isLoading={this.props.countryStats.isLoading}
            yesterday={this.props.countryStats.yesterday}
            confirmed={this.props.countryStats.cases}
            recovered={this.props.countryStats.recovered}
            deaths={this.props.countryStats.deaths}
          />
        </Segment>

        <Menu className='menuBar' secondary>
          <Menu.Item
            name='region'
            active={selected === 'region'}
            onClick={this.handleItemClick}
          >
            Region Chart
          </Menu.Item>

          <Menu.Item
            name='graph'
            active={selected === 'graph'}
            onClick={this.handleItemClick}
          >
            Graph View
          </Menu.Item>
        </Menu>

        {selected === 'region' &&
          <div>
            {this.props.countryRegion.regionList.length === 1 && (
              <Header color='red' as='h5' textAlign='center'>No region stats available for this country</Header>
            )}
            <Paper className='regionTable'>
              <MaterialTable
                isLoading={this.props.countryRegion.isLoading}
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
                  { title: "Province/State", field: "provinceState" },
                  { title: "Total Cases", field: "confirmed" },
                  { title: "Active", field: "active" },
                  { title: "Recovered", field: "recovered" },
                  { title: "Deaths", field: "deaths" }
                ]}
                data={ tableData }
                title={"Region Stats for " + this.props.countryStats.countryText}
              />
            </Paper>
          </div>
        }

        {selected === 'graph' &&
          <div>
            {this.props.countryHistory.error && (
              <Header color='red' as='h5' textAlign='center'>No historical stats available for this country</Header>
            )}
            <Paper className="globalCasesChart">
              {this.props.countryHistory.isLoading ? (
                <Segment>
                  <Dimmer active inverted >
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                  <Line data={dummyData} options={options} />
                </Segment>
              ): (
                <Line data={data} options={options} />
              )}
              
            </Paper>
          </div>
        }
      </div>
    )
  }
}
  
const mapStateToProps = ({ covid, global }) => ({
  countryCodes: covid.countryCodes,
  countryStats: covid.countryStats,
  countryRegion: covid.countryRegion,
  countryNav: global.countryNav,
  countryHistory: covid.countryHistory
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCountryCodes,
      getCountryStats,
      getCountryRegionStats,
      getCountryHistory,
      updateCountryNavOption
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryPage)
