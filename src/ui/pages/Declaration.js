import React from 'react';
import Declare from '../components/services/Declare'

import {
  userList,
  userData
} from '../../api/usersData'

const Declaration = () => {
  const user = userList[userData.idUser]
  return (
    <div className="row">
      <Declare user={user}/>
    </div>
  )
}

export default Declaration
