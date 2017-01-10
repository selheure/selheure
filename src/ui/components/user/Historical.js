import React from 'react';
import ServicesList from '../services/ServicesList'

import {
  servicesTypes
} from '../../../api/usersData'
import {
  servicesCategory
} from '../../../api/servicesData'


class Historical extends React.Component {

  render() {

    return(
      <div>
        Historical
        <ServicesList list={ this.props.user.historical } types={ servicesTypes } category={ servicesCategory }/>
      </div>
    )
  }
}

export default Historical
