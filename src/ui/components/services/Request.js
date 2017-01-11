import React from 'react';

import Select from '../generic/Select'

import {
  servicesCategory,
  servicesList
} from '../../../api/servicesData'


class Request extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      service: 0
    }
  }

  changeCategory(value) {
    this.setState({'service': value})
  }
  addRequete(user) {
    servicesList.push({idService: servicesList.length, type: 'Recherche', service: this.state.service, from: user.username })
    user.historical.push({idService: user.historical.length, type: 'Recherche', service: this.state.service, from: user.username })
  }

  render() {
    return(
      <div className="col m6 offset-m3 s12" style={{ 'border':  '2px double', 'borderRadius': '5px' }}>
        <h5>Recherche</h5>

        <div className="row">
          <Select title="Type de requete :" option={servicesCategory} onChange={ this.changeCategory.bind(this) }/>
        </div>

        <a className="waves-effect waves-light btn" onClick={ this.addRequete.bind(this, this.props.user) }>Valider</a>
      </div>
    )
  }
}

export default Request
