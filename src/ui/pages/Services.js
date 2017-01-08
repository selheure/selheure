import React from 'react';
import ServicesList from '../components/services/ServicesList'
import Propose from '../components/services/Propose'
import Request from '../components/services/Request'

class Services extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div>
        <ServicesList />
        <Propose />
        <Request />
      </div>
    )
  }
}

export default Services
