import React from 'react';
import ServicesList from '../components/services/ServicesList'
import ServiceProposition from '../components/services/ServiceProposition'
import ServiceRequest from '../components/services/ServiceRequest'

class Services extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div>
        <ServicesList />
        <ServiceProposition />
        <ServiceRequest />
      </div>
    )
  }
}

export default Services
