import React, {Component, Button} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push, goBack } from 'connected-react-router'
import { getGlobalDaily, getGlobalSummary } from '../../actions/covid'
import { Divider, Header, Icon } from 'semantic-ui-react'
import GlobalCards from '../../components/GlobalCards'
import {Line} from 'react-chartjs-2';


class GlobalSummaryPage extends Component {

  componentDidMount = () => {
    // only get data if data is empty
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

    return (
      <div>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='globe' />
            Global Cases Summary
          </Header>
        </Divider>

        <GlobalCards/>
        <div className="globalCasesChart">
          <Line data={data} />
        </div>
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
