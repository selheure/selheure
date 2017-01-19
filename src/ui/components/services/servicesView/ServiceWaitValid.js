import React from 'react';

import InfoRow from '../../generic/InfoRow'

const Button = ({service, user}) => {
  let result
  if ( user.username === service.from ) {
    result = service.validByFrom
  }
  else if ( user.username === service.for ) {
    result = service.validByFor
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

export const ServiceWaitValid = ({service, category, user}) => {

  return(
    <div className="row">
      <InfoRow title="Category :" contenu={ category[service.service] }/>

      <div className="row">
        <div className="col s6">
          <InfoRow title="Effectuer par :" contenu={ service.from }/>
        </div>
        <div className="col s6">
          <InfoRow title="Valider :" contenu={ service.validByFrom ? 'oui' : 'non' }/>
        </div>
      </div>
      <div className="row">
        <div className="col s6">
          <InfoRow title="Effectuer pour :" contenu={ service.for }/>
        </div>
        <div className="col s6">
          <InfoRow title="Valider :" contenu={ service.validByFor ? 'oui' : 'non' }/>
        </div>
      </div>

      <InfoRow title="Solde a valider (en heure) :" contenu={ service.time }/>

      <Button service={service} user={user}/>


    </div>
  )
}

export default ServiceWaitValid
