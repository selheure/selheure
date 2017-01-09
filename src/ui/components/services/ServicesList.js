import React from 'react';

import {
  servicesList,
  servicesTypes,
  servicesCategory
} from '../../../api/servicesData'

class ServicesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      servicesList: this.props.servicesList || servicesList
    }
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        ServicesList
      </div>
    )
  }

}

export default ServicesList
