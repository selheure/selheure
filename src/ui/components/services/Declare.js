import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link }       from 'react-router'

import Select from '../generic/Select'

import {
  servicesCategory
} from '../../../api/servicesData'


class Declare extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>Declaration</h5>
        <div className="row">
          <Select title="Type de declaration :" option={servicesCategory}/>

          <span>Demandant le service :</span>
          <span><input type="text"></input></span>

          <span>Ayant réaliser le service :</span>
          <span><input type="text"></input></span>

          <span>Temps de service :</span>
          <span><input type="text"></input></span>

          <a className="waves-effect waves-light btn">Valider</a>
        </div>
      </div>
    )
  }
}

export default Declare
