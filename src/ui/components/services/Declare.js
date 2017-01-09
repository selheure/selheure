import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link }       from 'react-router'

import Select from '../generic/Select'
import UserBarre from '../user/UserBarre'

import {
  servicesCategory
} from '../../../api/servicesData'

import {
  userData
} from '../../../api/usersData'

class Declare extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const profil = this.props.user || userData
    return(
      <div>
        <UserBarre profil={profil}/>
        <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
          Declaration
          <div className="row">
            <Select title="Type de declaration :" option={servicesCategory}/>

            <span>Demandant le service :</span>
            <span><input type="text"></input></span>

            <span>Ayant réaliser le service :</span>
            <span><input type="text"></input></span>

            <span>Temps de service :</span>
            <span><input type="text"></input></span>

          </div>
        </div>
      </div>
    )
  }
}

export default Declare
