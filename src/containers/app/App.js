import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import GlobalSummaryPage from '../GlobalSummaryPage'
import CountryPage from '../CountryPage'
import GlobalTablePage from '../GlobalTablePage'
import { Menu } from 'semantic-ui-react'
import { push, goBack } from 'connected-react-router'
import { updateNavbar } from '../../actions/global'

class App extends Component {

  componentDidMount = () => {
    let pathname = this.props.router.pathname
    if (pathname !== undefined || pathname.length > 1) {
      // on refresh, update navbar to correct item based on pathname
      this.props.updateNavbar(pathname.slice(1))
    }
  }

  handleItemClick = (e, { name }) => {
    this.props.updateNavbar(name)
    if (name !== "global") {
      this.props.push('/' + name)
    } else {
      this.props.push('/')
    }
  }
  
  render() {

    return (
      <div>
        <h1 className="title">COVID-19 Tracker</h1>
        <Menu className='menuBar' secondary>
          <Menu.Item
            name='global'
            active={this.props.navbar.selected === '' || this.props.navbar.selected === 'global'}
            onClick={this.handleItemClick}
            to="/"
          >
            Global
          </Menu.Item>

          <Menu.Item
            name='country'
            active={this.props.navbar.selected === 'country'}
            onClick={this.handleItemClick}
            to='/country'
          >
            By Country
          </Menu.Item>

          <Menu.Item
            name='stats'
            active={this.props.navbar.selected === 'stats'}
            onClick={this.handleItemClick}
          >
            All Stats
          </Menu.Item>
        </Menu>

        <main>
          <Route exact path="/" component={GlobalSummaryPage} />
          <Route exact path="/country" component={CountryPage} />
          <Route exact path="/stats" component={GlobalTablePage} />
        </main>

      </div>
    )
  }
}

const mapStateToProps = ({ router, global }) => ({
  router: router.location,
  navbar: global.navbar
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      goBack,
      updateNavbar
    },
    dispatch
  ) 


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
