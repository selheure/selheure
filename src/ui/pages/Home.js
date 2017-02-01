import React from 'react';
import AnnouncesList from '../components/announces/AnnouncesList'

import {
  declarations,
  declarationsTypes,
  announces,
  announcesTypes,
  announcesCategory
} from '../../api/servicesData'

import {
  userList,
  userData
} from '../../api/usersData'

const Home = () => {
  const user = userList[userData.idUser]
  return (
    <div className="row">
      <div className="col s6">
        <h5>Annonces</h5>
        <AnnouncesList type="announces" list={announces} types={announcesTypes} category={announcesCategory} user={user}/>
      </div>
      <div className="col s6">
        <h5>Declarations</h5>
        <AnnouncesList type="declarations" list={declarations} types={declarationsTypes} category={announcesCategory}/>
      </div>
    </div>
  )
}

export default Home
