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
    const historical = this.props.user.historical
    return(
      <div>
        <h5>Historique</h5>
        <ServicesList list={ historical } types={ servicesTypes } category={ servicesCategory }/>
      </div>
    )
  }
}

export default Historical
