import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import GlobalSummaryPage from '../GlobalSummaryPage'
import CountryPage from '../CountryPage'
import { Menu } from 'semantic-ui-react'
import { push, goBack } from 'connected-react-router'

class App extends Component {

  state = { activeItem : "global"}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    if (name !== "global") {
      this.props.push('/' + name)
    } else {
      this.props.push('/')
    }
  }
  
  render() {

    const { activeItem } = this.state

    return (
      <div>
        <h1 className="title">COVID-19 Tracker</h1>
        <Menu className='menuBar' secondary>
          <Menu.Item
            name='global'
            active={activeItem === 'global'}
            onClick={this.handleItemClick}
            to="/"
          >
            Global
          </Menu.Item>

          <Menu.Item
            name='country'
            active={activeItem === 'country'}
            onClick={this.handleItemClick}
            to='/country'
          >
            By Country
          </Menu.Item>

          <Menu.Item
            name='stats'
            active={activeItem === 'stats'}
            onClick={this.handleItemClick}
          >
            All Stats
          </Menu.Item>
        </Menu>

        <main>
          <Route exact path="/" component={GlobalSummaryPage} />
          <Route exact path="/country" component={CountryPage} />
        </main>

      </div>
    )
  }
}

const mapStateToProps = ({  }) => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      goBack
    },
    dispatch
  ) 


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
