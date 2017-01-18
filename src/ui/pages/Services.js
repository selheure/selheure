import React from 'react';
import Announce from '../components/services/Announce'

import {
  userList,
  userData
} from '../../api/usersData'

class Services extends React.Component {
  render() {
    const user = this.props.user || userList[userData.idUser]
    return(
      <div>
        <div className="row">
          <Announce user={user}/>
        </div>
      </div>
    )
  }
}

export default Services
