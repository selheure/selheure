import React from 'react';

import Compteur    from '../components/generic/Compteur'
import Historical from '../components/user/Historical'

class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user || { solde: 10, username: 'username', email: 'aaaa@aa.aa' }
    }
  }

  render() {
    const user = this.state.user
    return(
      <div className="col s12 m6 offset-m3">
        <div>
          <i className="material-icons prefix">account_circle</i>
          { user.username }
        </div>
        <div>
          <i className="material-icons prefix">account_circle</i>
          { user.email }
        </div>

        <Compteur title="Solde: " value={ user.solde } unite=" euro"/>
        <Historical />

      </div>
    )
  }
}

export default UserPage
