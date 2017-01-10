import React from 'react';

import Select from '../generic/Select'

import {
  servicesCategory,
  servicesList
} from '../../../api/servicesData'



class Propose extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 0
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  changeCategory(value) {
    this.setState({'type': value})
  }

  addProposition(value) {
    servicesList.push({idService: servicesList.length, type: 'Propose', service: 2, from: 'moi'})
    user.historical.push({idService: user.historical.length, type: 'Propose', service: 2, from: 'moi'})
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>Proposition</h5>
        <div className="row">
          <Select title="Type de proposition :" option={servicesCategory} onChange={this.changeCategory}/>

          <a className="waves-effect waves-light btn" onClick={ this.addProposition.bind(this) }>Valider</a>
        </div>
      </div>
    )
  }
}

export default Propose
