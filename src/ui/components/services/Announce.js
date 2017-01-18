import React from 'react';

import Select from '../generic/Select'

import {
  servicesCategory,
  servicesList,
  servicesChoice
} from '../../../api/servicesData'



class Announce extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      service: 0,
      type: 0
    }
  }

  changeType(e) {
    this.setState({'type': e.target.value})
  }

  changeCategory(e) {
    this.setState({'service': e.target.value})
  }

  changeMessage(e) {
    this.setState({'message': e.target.value})
  }

  addProposition(user) {
    const announce = {
      idService: servicesList.length,
      type: servicesChoice[this.state.type],
      service: this.state.service,
      from: user.username,
      message: this.state.message
    }
    servicesList.push(announce)
    user.historical.push(announce)
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>{ servicesChoice[this.state.type] }</h5>
        <div className="row">
          <Select title="Type d annonce :" option={servicesChoice} onChange={ this.changeType.bind(this) }/>
          <Select title="Type de proposition :" option={servicesCategory} onChange={ this.changeCategory.bind(this) }/>

          <span className="col s12 m6">Message :</span>
          <span className="col s12 m6"><input type="text" onChange={ this.changeMessage.bind(this) }></input></span>

          <a className="waves-effect waves-light btn right" onClick={ this.addProposition.bind(this, this.props.user) }>Valider</a>
        </div>
      </div>
    )
  }
}

export default Announce
