import React from 'react';
import ServicesList from '../components/services/ServicesList'
import Propose from '../components/services/Propose'
import Request from '../components/services/Request'

import {
  servicesList,
  servicesTypes,
  servicesCategory
} from '../../api/servicesData'

class Services extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div className="row">
        <ServicesList list={servicesList}/>
        <Propose />
        <Request />
      </div>
    )
  }
}

export default Services
