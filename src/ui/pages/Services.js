import React from 'react';
import Propose from '../components/services/Propose'
import Request from '../components/services/Request'


class Services extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div className="row">
        <Propose />
        <Request />
      </div>
    )
  }
}

export default Services
