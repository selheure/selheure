import React from 'react'
import AnnouncesList from '../components/announces/AnnouncesList'

import {
  userList,
  userData
} from '../../api/usersData'

import {
  declarations
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
      <AnnouncesList  genre="declarations" list={tab} types={{0: 'Declaration a valider'}} user={user}/>
    </div>
  )
}

export default Declaration
