import React from 'react';
import ServicesList from '../components/services/ServicesList'

import {
  servicesList,
  servicesTypes,
  servicesCategory
} from '../../api/servicesData'

import {
  userList,
  userData
} from '../../api/usersData'

class Home extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const user = this.props.user || userList[userData.idUser]
    return(
      <div className="row">
        <ServicesList list={servicesList} types={ servicesTypes } category={ servicesCategory }/>
      </div>
    )
  }
}

export default Home
