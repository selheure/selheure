import React from 'react';

import Service from './Service'
import Select from '../generic/Select'

import {
  servicesTypes
} from '../../../api/servicesData'

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
        if( (service.type === servicesTypes[this.state.typeSelected]) || (this.state.typeSelected == 0) ) {
          index.push(service)
        }
      })

    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px', 'padding': '10px' }}>
        ServicesList
        <Select title="Type de service :" option={servicesTypes} onChange={(e) => this.onChange(e.target.value)} value={this.state.typeSelected}/>

        {index.map(service =>
          <div key={ service.idService }>
            <Service service={ service } />
          </div>
          )}

      </div>
    )
  }

}

export default ServicesList
