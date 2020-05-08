import React, {Component, Button} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push, goBack } from 'connected-react-router'
import { getGlobalDaily, getGlobalSummary } from '../../actions/covid'
import { Divider, Header, Icon,
         Dimmer, Loader, Segment } from 'semantic-ui-react'
import { Paper } from '@material-ui/core'
import GlobalCards from '../../components/GlobalCards'
import { Line } from 'react-chartjs-2';
import Moment from 'react-moment';


class GlobalSummaryPage extends Component {

  componentDidMount = () => {
    if (this.props.globalSummary.isLoading) {
      this.props.getGlobalSummary()
    }

    if (this.props.globalSummary.isLoading) {
      this.props.getGlobalDaily()
    }
  }

  render() {
    let dateLabels = []
    let cases = []
    let recovered = []
    let deaths = []
    if (this.props.globalDaily.isLoading === false) {
      dateLabels = this.props.globalDaily.dates
      cases = this.props.globalDaily.cases
      recovered = this.props.globalDaily.recovered
      deaths = this.props.globalDaily.deaths
    }

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
      datasets: [{label:'', data: [0,5000,5000,4500000]}]
    }

    const options = {
        title: {
          display: true,
          text: 'Number of Confirmed Cases since Jan 22',
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

    return (
      <div>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='globe' />
            Global Cases Summary
          </Header>
        </Divider>

        <Header as='h5' textAlign='center'>
          <p>
            Last updated: &nbsp;
            {this.props.globalSummary.updated && (
              <Moment fromNow>
                {this.props.globalSummary.updated}
              </Moment>
            )}
          </p>
        </Header>

        <Segment basic>
          {this.props.globalSummary.isLoading && 
            <Dimmer active inverted >
              <Loader inverted>Loading</Loader>
            </Dimmer>
          }
          <GlobalCards 
            className='statsBox'
            yesterday={this.props.globalSummary.yesterday}
            confirmed={this.props.globalSummary.cases}
            recovered={this.props.globalSummary.recovered}
            deaths={this.props.globalSummary.deaths}
          />
        </Segment>

        <Paper className="globalCasesChart">
          {this.props.globalDaily.isLoading ? (
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
    )
  }
}
  
const mapStateToProps = ({ covid }) => ({
  globalSummary: covid.globalSummary,
  globalDaily: covid.globalDaily
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      goBack,
      getGlobalDaily,
      getGlobalSummary
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalSummaryPage)
