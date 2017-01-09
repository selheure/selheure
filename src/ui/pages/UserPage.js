import React from 'react';

import Compteur    from '../components/generic/Compteur'
import Historical from '../components/user/Historical'

import {
  userData
} from '../../api/usersData'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user || userData
    }
  }

  render() {
    const profil = this.state.user
    return(
      <div className="row">
        <div className="center">

          <ul>
            <li>
              <div className="center" >{ profil.userName }</div>
            </li>
            <li>
              <div className="center" >{ profil.eMail }</div>
            </li>
            <li>
              <div className="center" >{ profil.phone }</div>
            </li>
          </ul>

          <Compteur title="Solde: " value={ profil.solde } unite=" euro"/>
          <Historical />

        </div>
      </div>
    )
  }
}

export default UserPage
