import React from 'react';
import AnnounceForm from '../components/announces/AnnounceForm'

import {
  userList,
  userData
} from '../../api/usersData'

const Announce = () => {
  const user = userList[userData.idUser]
  return(
    <div>
      <div className="row">
        <AnnounceForm user={user}/>
      </div>
    </div>
  )
}

export default Announce
