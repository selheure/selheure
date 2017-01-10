import React from 'react';
import Declare from '../components/services/Declare'

import {
  userList,
  userData
} from '../../api/usersData'

class Declaration extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const user = this.props.user || userList[userData.idUser]
    return(
      <div className="row">
        <Declare />
      </div>
    )
  }
}

export default Declaration
