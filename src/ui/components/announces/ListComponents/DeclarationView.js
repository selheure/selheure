import React from 'react';

import {
  announcesCategory
} from '../../../../api/servicesData'

const Button = ({announce, user}) => {
  let result=true
  if (user) {
    if ( user.username === announce.from ) {
      result = announce.validByFrom
    }
    else if ( user.username === announce.for ) {
      result = announce.validByFor
    }
  }

  if (!result) {
    return(
      <div className="row">
        <div className="col s4 center">
          <a className="waves-effect waves-light btn">Valider</a>
        </div>
        <div className="col s4 center">
          <a className="waves-effect waves-light btn">Ajuster</a>
        </div>
        <div className="col s4 center">
          <a className="waves-effect waves-light btn">Refuser</a>
        </div>
      </div>
    )
  }
  return (
    <div></div>
  )
}

const DeclarationView = ({announce, user}) => {
  const tab = announcesCategory['categories']
  return (
    <div>
      <div className="row">
        <div className="col s2">
          { tab[announce.category] }
        </div>
        <div className="col s2">
          { announce.from }
        </div>
        <div className="col s2">
          { announce.validByFrom ? 'oui' : 'non' }
        </div>
        <div className="col s2">
          { announce.for }
        </div>
        <div className="col s2">
          { announce.validByFor ? 'oui' : 'non' }
        </div>
        <div className="col s2">
          { announce.time }
        </div>
      </div>
      <Button announce={announce} user={user}/>
    </div>
  )
}

export default DeclarationView
