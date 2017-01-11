import React from 'react';

import Select from '../generic/Select'

import {
  servicesCategory,
  declarationList
} from '../../../api/servicesData'


class Declare extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      service: 0,
      userA: 0,
      userB: 0,
      time: 0
    }
  }

  changeCategory(value) {
    this.setState({'service': value})
  }
  changeFrom(value) {
    this.setState({'userA': value})
  }
  changeFor(value) {
    this.setState({'userB': value})
  }
  changeTime(value) {
    this.setState({'time': value})
  }

  addDeclaration(user) {
    declarationList.push({idService: declarationList.length, type: 'Declaration', service: this.state.service, from: this.state.userA, for: this.state.userB})
    user.historical.push({idService: user.historical.length, type: 'Declaration', service: this.state.service, from: this.state.userA, for: this.state.userB})
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>Declaration</h5>
        <div className="row">
          <Select title="Type de declaration :" option={servicesCategory} onChange={this.changeCategory.bind(this)}/>

          <span>Demandant le service :</span>
          <span><input type="text" onChange={this.changeFrom.bind(this)}></input></span>

          <span>Ayant réaliser le service :</span>
          <span><input type="text" onChange={this.changeFor.bind(this)}></input></span>

          <span>Temps de service (en h) :</span>
          <span><input type="text" onChange={this.changeTime.bind(this)}></input></span>

          <a className="waves-effect waves-light btn" onClick={this.addDeclaration.bind(this, this.props.user)}>Valider</a>
        </div>
      </div>
    )
  }
}

export default Declare
