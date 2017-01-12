import React from 'react';

import InfoRow from '../../generic/InfoRow'

export const ServicePropose = ({service, category}) => {
  return(
    <div className="row">
      <InfoRow title="Category :" contenu={ category[service.service] }/>
      <InfoRow title="Proposer par :" contenu={ service.from }/>
    </div>
  )
}

export default ServicePropose
