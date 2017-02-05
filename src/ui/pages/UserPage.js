import React from 'react';

import Historical from '../components/user/Historical'
import UserInfo   from '../components/user/UserInfo'

import {
  userList,
  userData
} from '../../api/usersData'

const UserPage = () => {
  const user = userList[userData.idUser]
  return (
    <div>
      <div className="row">
      </div>
      <div className="row">
        <div className="center">

          <UserInfo user={ user }/>
          <Historical user={ user }/>

        </div>
      </div>
    </div>
  )
}

export default UserPage
