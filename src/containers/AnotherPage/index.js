import React, {Component, Button} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push, goBack } from 'connected-react-router'

class AnotherPage extends Component {
  componentDidMount = () => {
    // dispatch action here
  }

  render() {
    return (
      <div>
        <h1>Another Page</h1>
        <button onClick={() => this.props.push('/')} >Go Home</button>
        <button onClick={() => this.props.goBack()} >Back</button>
      </div>
    )
  }
}
  
const mapStateToProps = ({ }) => ({

})

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
)(AnotherPage)
