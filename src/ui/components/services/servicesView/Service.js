import React from 'react';

import InfoRow from '../../generic/InfoRow'

export const Service = ({service}) => {
  return(
    <div className="row">
      <InfoRow title="type :"         contenu={ service.type }/>
      <InfoRow title="Category :"     contenu={ service.service }/>
      <InfoRow title="Proposer par :" contenu={ service.from }/>
      <InfoRow title="Message :"      contenu={ service.message }/>
    </div>
  )
}

export default Service
