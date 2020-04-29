import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAdvice } from '../../actions/covid'
import { Statistic, Divider, Header,
         Icon, Grid }
from 'semantic-ui-react'

class GlobalCards extends Component {

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {

    let recoverPercentage = ""
    let deathPercentage = ""
    if (this.props.globalSummary.isLoading === false) {
        recoverPercentage = ((this.props.globalSummary.recovered.value / this.props.globalSummary.confirmed.value)*100).toFixed(1)
        deathPercentage = ((this.props.globalSummary.deaths.value / this.props.globalSummary.confirmed.value)*100).toFixed(1)
        recoverPercentage = recoverPercentage + "%"
        deathPercentage = deathPercentage + "%"
    }
    
    return (
        <Grid>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Row centered width={6}>
            <Statistic.Group>
              <Statistic color='blue' className='statSubBox'>
                <Statistic.Value>{this.numberWithCommas(this.props.globalSummary.confirmed.value)}</Statistic.Value>
                <Statistic.Label>Confirmed Cases</Statistic.Label>
              </Statistic>
              <Statistic color='red' className='statSubBox'>
                <Statistic.Value>{this.numberWithCommas(this.props.globalSummary.deaths.value)}</Statistic.Value>
                <Statistic.Label>Deaths ({deathPercentage})</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Grid.Row>
          <Grid.Row centered width={6}>
            <Statistic.Group>
              <Statistic color='green' className='statSubBox'>
                <Statistic.Value>{this.numberWithCommas(this.props.globalSummary.recovered.value)}</Statistic.Value>
                <Statistic.Label>Recovered ({recoverPercentage})</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Grid.Row>
          <Grid.Column width={3}></Grid.Column>
        </Grid>
    )
  }
}

const mapStateToProps = ({ covid }) => ({
    globalSummary: covid.globalSummary
})


export default connect(
  mapStateToProps,
  null
)(GlobalCards)
