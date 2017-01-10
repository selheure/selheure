import React from 'react';

import Select from '../generic/Select'

import {
  servicesCategory,
  declarationList
} from '../../../api/servicesData'


class Declare extends React.Component {
  constructor(props) {
    super(props)
  }

  addDeclaration(value) {
    declarationList.push( {idService: declarationList.lenght, type: 'Declaration', service: 4, from: 'pasMoi', for: 'moi'} )
    user.historical.push({idService: user.historical.length, type: 'Recherche', service: 2, from: 'moi'})
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>Declaration</h5>
        <div className="row">
          <Select title="Type de declaration :" option={servicesCategory}/>

          <span>Demandant le service :</span>
          <span><input type="text"></input></span>

          <span>Ayant réaliser le service :</span>
          <span><input type="text"></input></span>

          <span>Temps de service :</span>
          <span><input type="text"></input></span>

          <a className="waves-effect waves-light btn" onClick={ this.addDeclaration.bind(this) }>Valider</a>
        </div>
      </div>
    )
  }
}

export default Declare
