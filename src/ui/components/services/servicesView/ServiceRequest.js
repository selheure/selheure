import React from 'react';

import InfoRow from '../../generic/InfoRow'

export const ServiceRequest = ({service, category}) => {
  return(
    <div className="row">
      <InfoRow title="Category :" contenu={ category[service.service] }/>
      <InfoRow title="Rechercher par :" contenu={ service.from }/>
    </div>
  )
}

export default ServiceRequest
