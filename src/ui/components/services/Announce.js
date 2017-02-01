import React from 'react';

import Select from '../generic/Select'

import {
  announcesCategory,
  announces,
  servicesChoice
} from '../../../api/servicesData'



class Announce extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      service: '',
      type: ''
    }
  }

  changeType(e) {
    this.setState({'type': servicesChoice[e.target.value]})
  }

  changeCategory(e) {
    this.setState({'service': announcesCategory[e.target.value]})
  }

  changeMessage(e) {
    this.setState({'message': e.target.value})
  }

  addProposition(user) {
    const announce = {
      idService: announces.length,
      type: this.state.type,
      service: this.state.service,
      from: user.username,
      message: this.state.message
    }
    console.log(announce)
    announces.push(announce)
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>{ this.state.type }</h5>
        <div className="row">
          <Select title="Type d annonce :" option={servicesChoice} onChange={ this.changeType.bind(this) }/>
          <Select title="Type de proposition :" option={announcesCategory} onChange={ this.changeCategory.bind(this) }/>

          <span className="col s12 m6">Message :</span>
          <span className="col s12 m6"><input type="text" onChange={ this.changeMessage.bind(this) }></input></span>

          <a className="waves-effect waves-light btn right" onClick={ this.addProposition.bind(this, this.props.user) }>Valider</a>
        </div>
      </div>
    )
  }
}

export default Announce
