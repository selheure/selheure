import React from 'react';
import AnnouncesList from '../components/announces/AnnouncesList'

import {
  announces,
  announcesTypes
} from '../../api/servicesData'

import {
  userList,
  userData
} from '../../api/usersData'

const Home = () => {
  const user = userList[userData.idUser]
  return (
    <div className="row">
      <div className="col s12">
        <h5>Annonces</h5>
        <AnnouncesList genre="announces" list={announces} types={announcesTypes} user={user}/>
      </div>
    </div>
  )
}

export default Home
