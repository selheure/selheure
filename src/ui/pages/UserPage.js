import React from 'react';

import UserBarre from '../components/user/UserBarre'
import Historical from '../components/user/Historical'

import {
  userData
} from '../../api/usersData'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const profil = this.props.user || userData
    return(
      <div>
        <div className="row">
          <UserBarre profil={profil}/>
        </div>
        <div className="row">
          <div className="center">

            <ul>
              <li>
                <div className="center" >{ profil.eMail }</div>
              </li>
              <li>
                <div className="center" >{ profil.phone }</div>
              </li>
            </ul>

            <Historical />

          </div>
        </div>
      </div>
    )
  }
}

export default UserPage
