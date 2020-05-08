import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Divider } from 'semantic-ui-react'
import { Card, CardContent, Typography } from '@material-ui/core'


class CountryCard extends Component {


  render() {

    if (this.props.country === undefined || this.props.country == null) {
      return <div></div>
    }

    return (
      <Card className='countryCard' variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" component="h2">
            <Image src={this.props.country.flag} size='mini' inline />&nbsp; &nbsp;{this.props.country.country}
          </Typography>
          <Divider/>
          <Typography variant="body2" component="p">
            Total Cases: <b className='blue'>{this.props.country.cases}</b>
            <br/>
            Recovered: <b className='green'>{this.props.country.recovered}</b>
            <br/>
            Deaths: <b className='red'>{this.props.country.deaths}</b>
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = ({  }) => ({})

export default connect(
  mapStateToProps,
  null
)(CountryCard)
