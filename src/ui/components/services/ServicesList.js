import React from 'react';

import Service from './Service'
import Select from '../generic/Select'


class ServicesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeSelected: 0
    }
  }

  onChange(value) {
    this.setState({'typeSelected': value})
  }

  render() {
    const index = []

    this.props.list.forEach(service => {
        if( (service.type === this.props.types[this.state.typeSelected]) || (this.state.typeSelected == 0) ) {
          index.push(service)
        }
      })

    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '10px' }}>
        <h5>Liste des services</h5>
        <Select title="Type de service :" option={this.props.types} onChange={(e) => this.onChange(e.target.value)} value={this.state.typeSelected}/>

        {index.map(service =>
          <div key={ service.idService }>
            <Service service={ service } seeTitle={ (this.state.typeSelected == 0) } category={ this.props.category }/>
          </div>
          )}

      </div>
    )
  }

}

export default ServicesList
