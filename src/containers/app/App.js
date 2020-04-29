import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import GlobalSummaryPage from '../GlobalSummaryPage'


class App extends Component {
  
  render() {

    return (
      <div>
        <h1 className="title">COVID-19 Tracker</h1>

        <main>
          <Route exact path="/" component={GlobalSummaryPage} />
        </main>

      </div>
    )
  }
}

const mapStateToProps = ({  }) => ({})


export default connect(
  mapStateToProps,
  null
)(App)
