import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link }       from 'react-router'

import Select from '../generic/Select'

import {
  servicesCategory
} from '../../../api/servicesData'


class Request extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div className="col m6 offset-m3 s12" style={{ 'border':  '2px double', 'borderRadius': '5px' }}>
        <h5>Recherche</h5>

        <div className="row">
          <Select title="Type de requete :" option={servicesCategory}/>
        </div>

        <a className="waves-effect waves-light btn">Valider</a>
      </div>
    )
  }
}

export default Request
