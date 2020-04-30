import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
    if (this.props.recovered !== 0) {
      recoverPercentage = ((this.props.recovered / this.props.confirmed)*100).toFixed(1)
      deathPercentage = ((this.props.deaths / this.props.confirmed)*100).toFixed(1)
      recoverPercentage = "(" + recoverPercentage + "%)"
      deathPercentage = "(" + deathPercentage + "%)"
    }
   
    return (
      <div className={this.props.className}>
        <Statistic color='blue' className='statSubBox'>
          <Statistic.Value>{this.numberWithCommas(this.props.confirmed)}</Statistic.Value>
          <Statistic.Label>Confirmed Cases</Statistic.Label>
        </Statistic>
        <Statistic color='red' className='statSubBox'>
          <Statistic.Value>{this.numberWithCommas(this.props.deaths)}</Statistic.Value>
          <Statistic.Label>Deaths {deathPercentage}</Statistic.Label>
        </Statistic>
        <Statistic color='green' className='statSubBox'>
          <Statistic.Value>{this.numberWithCommas(this.props.recovered)}</Statistic.Value>
          <Statistic.Label>Recovered {recoverPercentage}</Statistic.Label>
        </Statistic>
      </div>
    )
  }
}

const mapStateToProps = ({  }) => ({})

export default connect(
  mapStateToProps,
  null
)(GlobalCards)
