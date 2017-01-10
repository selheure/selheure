import React from 'react';

import Historical from '../components/user/Historical'

import {
  userList,
  userData
} from '../../api/usersData'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const user = this.props.user || userList[userData.idUser]
    return(
      <div>
        <div className="row">
        </div>
        <div className="row">
          <div className="center">

            <ul>
              <li>
                <div className="center" >{ user.eMail }</div>
              </li>
              <li>
                <div className="center" >{ user.phone }</div>
              </li>
            </ul>

            <Historical user={ user }/>

          </div>
        </div>
      </div>
    )
  }
}

export default UserPage
