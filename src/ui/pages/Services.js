import React from 'react';
import Propose from '../components/services/Propose'
import Request from '../components/services/Request'

import {
  userData
} from '../../api/usersData'

class Services extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const profil = this.props.user || userData
    return(
      <div className="row">
        <Propose />
        <Request />
      </div>
    )
  }
}

export default Services
