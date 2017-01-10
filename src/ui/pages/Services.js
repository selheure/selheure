import React from 'react';
import Propose from '../components/services/Propose'
import Request from '../components/services/Request'

import {
  userList,
  userData
} from '../../api/usersData'

class Services extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const user = this.props.user || userList[userData.idUser]
    return(
      <div>
        <div className="row">
          <Propose user={user}/>
        </div>
        <div className="row">
          <Request user={user}/>
        </div>
      </div>
    )
  }
}

export default Services
