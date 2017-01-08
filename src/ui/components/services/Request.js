import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Link }       from 'react-router'

import Select from '../generic/Select'

import {
  servicesTypes
} from '../../../api/servicesTypes'


class Request extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div className="col m6 offset-m3 s12">
        Request

        <div className="row">
          <Select title="Type de requete :" option={servicesTypes}/>
        </div>

      </div>
    )
  }
}

export default Request
