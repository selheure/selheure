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
      service: 0
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  changeCategory(e) {
    this.setState({'service': e.target.value})
  }

  addProposition(user) {
    servicesList.push({ idService: servicesList.length, type: 'Propose', service: this.state.service, from: user.username })
    user.historical.push({ idService: user.historical.length, type: 'Propose', service: this.state.service, from: user.username })
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>Proposition</h5>
        <div className="row">
          <Select title="Type de proposition :" option={servicesCategory} onChange={ this.changeCategory.bind(this) }/>

          <a className="waves-effect waves-light btn" onClick={ this.addProposition.bind(this, this.props.user) }>Valider</a>
        </div>
      </div>
    )
  }
}

export default Propose
