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
        Propose
        <div className="row">
          <Select title="Type de proposition :" option={servicesCategory}/>
        </div>
      </div>
    )
  }
}

export default Propose
