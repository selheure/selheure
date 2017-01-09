import React from 'react';

import Service from './Service'
import Select from '../generic/Select'

import {
  servicesTypes
} from '../../../api/servicesData'

class ServicesList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="col s12 m6 offset-m3" style={{ 'border': '2px double', 'borderRadius': '5px' }}>
        ServicesList
        <Select title="Type de service :" option={servicesTypes}/>

        {this.props.list.map(service =>
          <div key={ service.type }>
            <Service title={ service.type } />
          </div>
          )}

      </div>
    )
  }

}

export default ServicesList
