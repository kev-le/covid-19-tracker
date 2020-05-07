import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'
import { Paper } from '@material-ui/core';
import CountUp from 'react-countup';


class CountryCard extends Component {


  render() {

    return (
      <Paper>
        <Statistic color='blue' >
          <Statistic.Value>
            <CountUp
              start={0}
              end={3213}
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
        </Statistic>
      </Paper>
    )
  }
}

const mapStateToProps = ({  }) => ({})

export default connect(
  mapStateToProps,
  null
)(CountryCard)
