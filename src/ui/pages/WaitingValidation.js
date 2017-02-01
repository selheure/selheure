import React from 'react'
import ServicesList from '../components/services/ServicesList'

import {
  userList,
  userData
} from '../../api/usersData'

import {
  declarations,
  announcesCategory
} from '../../api/servicesData'

const Declaration = () => {
  const user = userList[userData.idUser]
  let tab = []
  declarations.forEach(service => {
    if (( service.from === user.username ) || ( service.for === user.username ) ) {
      tab.push(service)
    }
  })

  return (
    <div className="row">
      <h5>Attente de validation</h5>
      <ServicesList  type="declarations" list={tab} types={{0: 'Tous'}} category={announcesCategory} user={user}/>
    </div>
  )
}

export default Declaration
