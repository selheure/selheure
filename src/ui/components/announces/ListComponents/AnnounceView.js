import React from 'react';

import {
  announcesCategory,
  announcesTypes

} from '../../../../api/servicesData'

const Button = ({announce, user}) => {

  if (user) {
    return(
      <div className="row">
        <div className="col s4 center">
          <a className="waves-effect waves-light btn">Postuler</a>
        </div>
      </div>
    )
  }
  return (
    <div></div>
  )
}

const AnnounceView = ({announce, user}) => {
  const tab = announcesCategory['categories']
  return (
    <div>
      <div className="row">
        <div className="col s3">
          { announcesTypes[announce.type] }
        </div>
        <div className="col s3">
          { tab[announce.category] }
        </div>
        <div className="col s3">
          { announce.from }
        </div>
        <div className="col s3">
          { announce.message }
        </div>
      </div>
      <Button announce={announce} user={user}/>
    </div>
  )
}

export default AnnounceView
