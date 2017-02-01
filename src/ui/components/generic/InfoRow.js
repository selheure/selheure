import React from 'react';

const InfoRow = ({title, contenu}) => (
  <div className="row">
    <div className="col s12 m6">
      {title}
    </div>
    <div className="col s12 m6">
      { contenu }
    </div>
  </div>
)

export default InfoRow
