import React from 'react'
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
    let tab = []
    declarationList.forEach(service => {
      if (( service.from === user.username ) || ( service.for === user.username ) ) {
        tab.push(service)
      }
    })

    return(
      <div className="row">
        <h5>Attente de validation</h5>
        <ServicesList list={tab} types={{0: 'Tous'}} category={servicesCategory} user={user}/>
      </div>
    )
  }
}

export default Declaration
