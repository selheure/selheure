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
      category: '1',
      from: '',
      for: '',
      time: 0
    }
  }

  changeCategory(e) {
    this.setState({'category':e.target.value})
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
      _id: declarations.length,
      type: '0',
      category: this.state.category,
      from: this.state.from,
      for: this.state.for,
      validByFrom: this.state.from === user.username,
      validByFor: this.state.for === user.username,
      time: 0
    })

    this.setState({category: "1",from: '',for: '',time: 0})
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>Declaration</h5>
        <div className="row">
          <Select
            title="Type de declaration :"
            option={announcesCategory['categories']}
            onChange={this.changeCategory.bind(this)}
            value={this.state.category}/>

          <span>A realise la demande :</span>
          <span><input type="text" onChange={this.changeFrom.bind(this)}></input></span>

          <span>Pour :</span>
          <span><input type="text" onChange={this.changeFor.bind(this)}></input></span>

          <span>Date de l'echange :</span>
          <div className="row">
            <div className="col s6">
              <input type="date" name="start-date" min="2017-01-01"></input>
            </div>
            <div className="col s6">
              <input type="time" name="start-time"></input>
            </div>
          </div>

          <a className="waves-effect waves-light btn right" onClick={this.addDeclaration.bind(this, this.props.user)}>Valider</a>
        </div>
      </div>
    )
  }
}

export default DeclareForm
