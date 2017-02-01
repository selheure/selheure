import React from 'react';

import InfoRow from '../../generic/InfoRow'

export const ServiceDeclare = ({announce}) => {
  return(
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
  )
}

export default ServiceDeclare
