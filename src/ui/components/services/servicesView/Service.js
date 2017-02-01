import React from 'react';

import InfoRow from '../../generic/InfoRow'

export const Service = ({announce}) => (
  <div className="row">
    <div className="col s3">
      { announce.type }
    </div>
    <div className="col s3">
      { announce.service }
    </div>
    <div className="col s3">
      { announce.from }
    </div>
    <div className="col s3">
      { announce.message }
    </div>
  </div>
)


export default Service
