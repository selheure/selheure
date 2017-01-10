import React from 'react';

import NavBar from '../components/NavBar'
import {
  userData
} from '../../api/usersData'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const profil = this.props.user || userData
    return (
      <header>
        <NavBar user={profil}/>
      </header>
    )
  }
}



export default Header
