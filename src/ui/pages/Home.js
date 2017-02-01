import React from 'react';
import ServicesList from '../components/services/ServicesList'

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
        <ServicesList type="announces" list={announces} types={announcesTypes} category={announcesCategory} user={user}/>
      </div>
      <div className="col s6">
        <h5>Declarations</h5>
        <ServicesList type="declarations" list={declarations} types={declarationsTypes} category={announcesCategory} user={user}/>
      </div>
    </div>
  )
}

export default Home
