import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link }       from 'react-router'

import Select from '../generic/Select'

import {
  servicesCategory
} from '../../../api/servicesData'

class Propose extends React.Component {
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
        <h5>Proposition</h5>
        <div className="row">
          <Select title="Type de proposition :" option={servicesCategory}/>
          <a className="waves-effect waves-light btn">Valider</a>
        </div>
      </div>
    )
  }
}

export default Propose
