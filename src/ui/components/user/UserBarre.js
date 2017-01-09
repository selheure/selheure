import React from 'react';

import Compteur    from '../generic/Compteur'


class UserBarre extends React.Component {

  render() {

    return(
      <div className="col s10 offset-s1" style={{ 'border': '2px double', 'borderRadius': '5px', 'margin': '10px' }}>
        <Compteur title="Solde: " value={ this.props.profil.solde } unite=" euro"/>
        <div className="center" >{ this.props.profil.userName }</div>
      </div>
    )
  }
}

export default UserBarre
