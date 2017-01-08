import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link }       from 'react-router'

import Select from '../generic/Select'

import {
  servicesTypes
} from '../../../api/servicesTypes'

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
      <div className="col m6 offset-m3 s12">
        Propose
        <div className="row">
          <Select title="Type de proposition :" option={servicesTypes}/>
        </div>
      </div>
    )
  }
}

export default Propose
