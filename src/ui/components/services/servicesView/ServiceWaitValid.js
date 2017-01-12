import React from 'react';

import InfoRow from '../../generic/InfoRow'

export const ServiceWaitValid = ({service, category}) => {
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

      <div className="row">
        <div className="col s4">
          <a className="waves-effect waves-light btn">Valider</a>
        </div>
        <div className="col s4">
          <a className="waves-effect waves-light btn">Ajuster</a>
        </div>
        <div className="col s4">
          <a className="waves-effect waves-light btn">Refuser</a>
        </div>
      </div>


    </div>
  )
}

export default ServiceWaitValid
