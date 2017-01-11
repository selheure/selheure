import React from 'react';
import Declare from '../components/services/Declare'
import ServicesList from '../components/services/ServicesList'

import {
  userList,
  userData
} from '../../api/usersData'

import {
  declarationList,
  servicesCategory
} from '../../api/servicesData'

class Declaration extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const user = this.props.user || userList[userData.idUser]
    return(
      <div className="row">
        <Declare user={user}/>
        <ServicesList list={declarationList} types={{0: 'Tous'}} category={servicesCategory}/>
      </div>
    )
  }
}

export default Declaration
