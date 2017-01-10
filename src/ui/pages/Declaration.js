import React from 'react';
import Declare from '../components/services/Declare'


import {
  userData
} from '../../api/usersData'

class Declaration extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const profil = this.props.user || userData
    return(
      <div className="row">
        <Declare />
      </div>
    )
  }
}

export default Declaration
