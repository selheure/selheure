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
      <div className="row">
        <Propose />
        <Request />
      </div>
    )
  }
}

export default Services
