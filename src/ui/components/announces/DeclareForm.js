import React from 'react';

import Select from '../generic/Select'

import {
  announcesCategory,
  declarations
} from '../../../api/servicesData'


class DeclareForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      service: '',
      from: '',
      for: '',
      time: 0
    }
  }

  changeCategory(e) {
    this.setState({'service':announcesCategory[e.target.value]})
  }

  changeFrom(e) {
    this.setState({'from': e.target.value})
  }

  changeFor(e) {
    this.setState({'for': e.target.value})
  }

  changeTime(e) {
    this.setState({'time': e.target.value})
  }

  addDeclaration(user) {

    declarations.push({
      idService: declarations.length,
      type: 'Declaration a valider',
      service: this.state.service,
      from: this.state.from,
      for: this.state.for,
      validByFrom: this.state.from === user.username,
      validByFor: this.state.for === user.username,
      time: 0
    })

    // a ajouter a la validation
    //user.historical.push({idService: user.historical.length, type: 'Declaration', service: this.state.service, from: this.state.userA, for: this.state.userB})

    this.setState({service: 0,from: '',for: '',time: 0})
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>Declaration</h5>
        <div className="row">
          <Select
            title="Type de declaration :"
            option={announcesCategory}
            onChange={this.changeCategory.bind(this)}
            value={this.state.service}/>

          <span>A realise le service :</span>
          <span><input type="text" onChange={this.changeFrom.bind(this)}></input></span>

          <span>Pour :</span>
          <span><input type="text" onChange={this.changeFor.bind(this)}></input></span>

          <span>Debut de service :</span>
          <div className="row">
            <div className="col s6">
              <input type="date" name="start-date" min="2017-01-01"></input>
            </div>
            <div className="col s6">
              <input type="time" name="start-time"></input>
            </div>
          </div>

          <span>Fin de service :</span>
          <div className="row">
            <div className="col s6">
              <input type="date" name="end-date" min="2017-01-01"></input>
            </div>
            <div className="col s6">
              <input type="time" name="end-time"></input>
            </div>
          </div>

          <a className="waves-effect waves-light btn right" onClick={this.addDeclaration.bind(this, this.props.user)}>Valider</a>
        </div>
      </div>
    )
  }
}

export default DeclareForm
