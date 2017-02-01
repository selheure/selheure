import React from 'react';
import DeclareForm from '../components/announces/DeclareForm'

import {
  userList,
  userData
} from '../../api/usersData'

const Declaration = () => {
  const user = userList[userData.idUser]
  return (
    <div className="row">
      <DeclareForm user={user}/>
    </div>
  )
}

export default Declaration
