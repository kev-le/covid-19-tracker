import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import GlobalSummaryPage from '../GlobalSummaryPage'
import { Menu } from 'semantic-ui-react'

class App extends Component {

  state = { activeItem : "global"}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
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
          >
            Global
          </Menu.Item>

          <Menu.Item
            name='country'
            active={activeItem === 'country'}
            onClick={this.handleItemClick}
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
