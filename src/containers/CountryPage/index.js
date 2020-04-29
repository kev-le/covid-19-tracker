import React, {Component, Button} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCountryCodes } from '../../actions/covid'
import { Divider, Header, Icon, Dropdown } from 'semantic-ui-react'

class CountryPage extends Component {

  componentDidMount = () => {
    if (this.props.countryCodes.isLoading || this.props.countryCodes.countryList === undefined) {
      this.props.getCountryCodes()
    }
  }

  getCountryObject = (country) => {
    return {
      key : country.iso2.toLowerCase(),
      value : country.iso2.toLowerCase(),
      flag: country.iso2.toLowerCase(),
      text: country.name
    }
  }

  render() {
    var countries = []
    var countryOptions = []
    if (!this.props.countryCodes.isLoading && this.props.countryCodes.countryList !== undefined) {
      countries = this.props.countryCodes.countryList
      for (var i = 0; i < countries.length; i++) {
        if (countries[i].iso2 !== undefined) {
          countryOptions.push(this.getCountryObject(countries[i]))
        }
      }
    }

    return (
      <div>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='globe' />
            Country Filter
          </Header>
        </Divider>
        <Dropdown
          className='countryDropdown'
          defaultValue='ca'
          fluid
          search
          selection
          options={countryOptions}
        />
      </div>
    )
  }
}
  
const mapStateToProps = ({ covid }) => ({
  countryCodes: covid.countryCodes
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCountryCodes
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryPage)
