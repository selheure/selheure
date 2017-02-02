import React from 'react';

import Select from '../generic/Select'

import {
  announcesCategory,
  announces,
  announcesTypes
} from '../../../api/servicesData'


class AnnounceForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: "1",
      subCategory: "1",
      type: "0"
    }
  }

  changeType(e) {
    this.setState({'type': e.target.value})
  }
  changeCategory(e) {
    this.setState({'category': e.target.value})
  }
  changeSubCategory(e) {
    this.setState({'subCategory': e.target.value})
  }
  changeMessage(e) {
    this.setState({'message': e.target.value})
  }

  addProposition(user) {
    const announce = {
      _id: announces.length,
      type: this.state.type,
      category: this.state.category,
      from: user.username,
      message: this.state.message
    }
    console.log(announce)
    announces.push(announce)
  }

  render() {
    const subTab = announcesCategory['sub_categories']
    const subTab2 = subTab[this.state.category]
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        <h5>{ announcesTypes[this.state.type] }</h5>
        <div className="row">
          <Select title="Type d annonce :" option={announcesTypes} onChange={ this.changeType.bind(this) }/>
          <Select title="Type de proposition :" option={announcesCategory['categories']} onChange={ this.changeCategory.bind(this) }/>

          <span className="col s12 m6">Message :</span>
          <span className="col s12 m6"><input type="text" onChange={ this.changeMessage.bind(this) }></input></span>

          <a className="waves-effect waves-light btn right" onClick={ this.addProposition.bind(this, this.props.user) }>Valider</a>
        </div>
      </div>
    )
  }
}

export default AnnounceForm
