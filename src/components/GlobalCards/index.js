import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'
import { Paper } from '@material-ui/core';
import CountUp from 'react-countup';


class GlobalCards extends Component {

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  shouldLoadLabel(cases) {
    if (cases !== 0) {
      return true
    }
    return false
  }

  render() {

    let recoverPercentage = ""
    let deathPercentage = ""
    let yesterdayCases = 0
    let yesterdayDeaths = 0
    let yesterdayRecovered = 0

    if (this.props.recovered !== 0) {
      recoverPercentage = ((this.props.recovered / this.props.confirmed)*100).toFixed(1)
      deathPercentage = ((this.props.deaths / this.props.confirmed)*100).toFixed(1)
      recoverPercentage = "(" + recoverPercentage + "%)"
      deathPercentage = "(" + deathPercentage + "%)"

      if (this.props.yesterday !== undefined && !this.props.yesterday.isLoading && !this.props.isLoading) {
        if (this.props.yesterday.cases !== 0) {
          yesterdayCases = this.props.confirmed - this.props.yesterday.cases
        }
  
        if (this.props.yesterday.deaths !== 0) {
          yesterdayDeaths = this.props.deaths - this.props.yesterday.deaths
        }
  
        if (this.props.yesterday.recovered !== 0) {
          yesterdayRecovered = this.props.recovered - this.props.yesterday.recovered
        }
      }
      
    }

    
   
    return (
      <div className={this.props.className}>
      
        <Paper className='statSubBox'>
          <Statistic color='blue' >
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
            {this.shouldLoadLabel(yesterdayCases) &&
              <CountUp
                start={0}
                end={yesterdayCases}
                duration={1}
                separator=','
                delay={0}
                useEasing={true}
              >
                {({ countUpRef }) => (
                  <p className='blue'>
                    <b>+<span ref={countUpRef}/> Today </b>
                  </p>
                )}
              </CountUp>
            }
          </Statistic>
        </Paper>

        <Paper className='statSubBox'>
          <Statistic color='red'>
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
                      <span ref={countUpRef}/>
                    </div>
                  )}
                </CountUp>
            </Statistic.Value>
            <Statistic.Label>Deaths {deathPercentage}</Statistic.Label>
            {this.shouldLoadLabel(yesterdayDeaths) &&
              <CountUp
                start={0}
                end={yesterdayDeaths}
                duration={1}
                separator=','
                delay={0}
                useEasing={true}
              >
                {({ countUpRef }) => (
                  <p className='red'>
                    <b>+<span ref={countUpRef}/> Today </b>
                  </p>
                )}
              </CountUp>
            }
          </Statistic>
        </Paper>
        
        <Paper className='statSubBox'>
          <Statistic color='green'>
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
            {this.shouldLoadLabel(yesterdayRecovered) &&
              <CountUp
                start={0}
                end={yesterdayRecovered}
                duration={1}
                separator=','
                delay={0}
                useEasing={true}
              >
                {({ countUpRef }) => (
                  <p className='green'>
                    <b>+<span ref={countUpRef}/> Today </b>
                  </p>
                )}
              </CountUp>
            }
          </Statistic>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({  }) => ({})

export default connect(
  mapStateToProps,
  null
)(GlobalCards)
