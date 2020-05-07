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
    let dateLabels = ['2020-04-01', '2020-04-02', '2020-04-03', '2020-04-04', '2020-04-05']
    let casesData = []
    if (this.props.globalDaily.isLoading === false) {
      var list = this.props.globalDaily.confirmedList
      dateLabels = []
      for (var i = 0; i < list.length; i++) {
        dateLabels.push(list[i]['reportDate'])
        casesData.push(list[i]['totalConfirmed'])
      }
    }

    const data = {
      labels: dateLabels,
      datasets: [
        {
          label: 'Confirmed Cases',
          fill: 'origin',
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
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 30,
          data: casesData
        }
      ]
    }

    const options = {
        title: {
          display: true,
          text: 'Number of Confirmed Cases since Jan 22',
          fontSize: 20,
          fontColor: '#000000'
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
              <Moment format="MMM D YYYY hh:mm:ss" withTitle>
                {this.props.globalSummary.updated}
              </Moment>
            )}
          </p>
        </Header>

        <Segment basic>
          {this.props.globalSummary.isLoading ? (
            <Dimmer active inverted >
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : <div/>}
          <GlobalCards 
            className='statsBox'
            yesterday={this.props.globalSummary.yesterday}
            confirmed={this.props.globalSummary.cases}
            recovered={this.props.globalSummary.recovered}
            deaths={this.props.globalSummary.deaths}
          />
        </Segment>

        <Paper className="globalCasesChart">
          <Line data={data} options={options} />
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
