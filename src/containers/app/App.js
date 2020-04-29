import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGlobalDaily, getGlobalSummary } from '../../actions/covid'
import { Statistic, Divider, Header,
         Icon, Grid, Image } from 'semantic-ui-react'
import GlobalCards from '../../components/GlobalCards'



class App extends Component {


  componentDidMount = () => {
    console.log(this.props.global)
    // only get advice if advice text is empty
    if (this.props.globalDaily === undefined || this.props.globalDaily.length == 0) {
      this.props.getGlobalSummary()
      this.props.getGlobalDaily()
    }
  }
  
  render() {
    return (
      <div>
        <h1 className="title">COVID-19 Tracker</h1>

        <Divider horizontal>
          <Header as='h4'>
            <Icon name='globe' />
            Global Cases Summary
          </Header>
        </Divider>

        <GlobalCards/>

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
      getGlobalDaily,
      getGlobalSummary
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
