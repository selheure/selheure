import React from 'react';

import InfoRow from '../../generic/InfoRow'

const Button = ({announce, user}) => {
  let result=true
  if ( user.username === announce.from ) {
    result = announce.validByFrom
  }
  else if ( user.username === announce.for ) {
    result = announce.validByFor
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

const ServiceWaitValid = ({announce, user}) => {
  return(
    <div>
      <div className="row">
        <div className="col s2">
          { announce.service }
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

export default ServiceWaitValid
