import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Statistic, Divider, Header,
         Icon, Grid }
from 'semantic-ui-react'
import CountUp from 'react-countup';


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
          <Statistic.Value>
            <CountUp
              start={0}
              end={this.props.confirmed}
              duration={1}
              separator=','
              delay={0}
            >
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </Statistic.Value>
          <Statistic.Label>Confirmed Cases</Statistic.Label>
        </Statistic>
        <Statistic color='red' className='statSubBox'>
          <Statistic.Value>
            <CountUp
                start={0}
                end={this.props.deaths}
                duration={1}
                separator=','
                delay={0}
              >
                {({ countUpRef }) => (
                  <div>
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
          </Statistic.Value>
          <Statistic.Label>Deaths {deathPercentage}</Statistic.Label>
        </Statistic>
        <Statistic color='green' className='statSubBox'>
          <Statistic.Value>
            <CountUp
              start={0}
              end={this.props.recovered}
              duration={0.7}
              separator=','
              delay={0}
              useEasing={true}
            >
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </Statistic.Value>
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
