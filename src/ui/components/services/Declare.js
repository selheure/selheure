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

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        Declare
        <div className="row">
          <Select title="Type de declaration :" option={servicesCategory}/>

          <span>id de l'utilisateur demandant le service :</span>
          <span><input type="text"></input></span>

          <span>id de l'utilisateur ayant réaliser le service :</span>
          <span><input type="text"></input></span>

        </div>
      </div>
    )
  }
}

export default Declare
