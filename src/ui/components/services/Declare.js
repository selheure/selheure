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
      userA: '',
      userB: '',
      time: 0
    }
  }

  changeCategory(e) {
    this.setState({'service': e.target.value})
  }
  changeFrom(e) {
    this.setState({'userA': e.target.value})
  }
  changeFor(e) {
    this.setState({'userB': e.target.value})
  }
  changeTime(e) {
    this.setState({'time': e.target.value})
  }

  addDeclaration(user) {

    declarationList.push({
      idService: declarationList.length,
      type: 'Declaration a valider',
      service: this.state.service,
      userA: this.state.userA,
      userB: this.state.userB,
      validByA: this.state.userA === user.username ,
      validByB: this.state.userA === user.username
    })

    // a ajouter a la validation
    //user.historical.push({idService: user.historical.length, type: 'Declaration', service: this.state.service, from: this.state.userA, for: this.state.userB})

    this.setState({service: 0,userA: '',userB: '',time: 0})
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>Declaration</h5>
        <div className="row">
          <Select
            title="Type de declaration :"
            option={servicesCategory}
            onChange={this.changeCategory.bind(this)}
            value={this.state.service}/>

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
