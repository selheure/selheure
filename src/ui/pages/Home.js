import React from 'react';
import ServicesList from '../components/services/ServicesList'

import {
  servicesList,
  servicesTypes,
  servicesCategory
} from '../../api/servicesData'


class Home extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div className="row">
        <ServicesList list={servicesList}/>
      </div>
    )
  }
}

export default Home
