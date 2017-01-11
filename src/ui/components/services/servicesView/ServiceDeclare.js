import React from 'react';

import InfoRow from '../../generic/InfoRow'

export const ServiceDeclare = ({service, category}) => {
  return(
    <div className="row">
      <InfoRow title="Type de service :" contenu={ category[service.service] }/>
      <InfoRow title=" Par :" contenu={ service.from }/>
      <InfoRow title=" Pour :" contenu={ service.for }/>
    </div>
  )
}

export default ServiceDeclare
