import React from 'react';
import AnnouncesList from '../components/announces/AnnouncesList'

import {
  declarations,
  declarationsTypes
} from '../../api/servicesData'

import {
  userList,
  userData
} from '../../api/usersData'

const DeclarationsList = () => {
  const user = userList[userData.idUser]
  return (
    <div className="row">
      <div className="col s12">
        <h5>Declarations</h5>
        <AnnouncesList genre="declarations" list={declarations} types={declarationsTypes} user={user}/>
      </div>
    </div>
  )
}

export default DeclarationsList
